Ext.define "MsAdmin.controller.SensorController",
  extend: "Ext.app.Controller"
  mixins: ["MsAdmin.mixins.FormControllerMixin"]
  views: ["sensor.SensorList", "sensor.SensorViewWindow", "sensor.SensorListPanel"]
  stores: ["Sensors"]
  models: ["Sensor"]
  refs: [
    ref: "Viewport"
    selector: "Viewport"
  ,
    ref: "SensorList"
    selector: "SensorList"
  ,
    ref: "SensorEditForm"
    selector: "SensorViewWindow[ref='edit'] form"
  ,
    ref: "SensorEditWindow"
    selector: "SensorViewWindow[ref='edit']"
  ]
  init: ->
    @control
      SensorList:
        itemclick: @onListItemClick
        activeiconclick: @onActiveIconClick
        editiconclick: @onEditIconClick

      "SensorListPanel [ref=\"addButton\"]":
        click: @onAddButtonClick

      "SensorListPanel [ref=\"deleteButton\"]":
        click: @onDeleteButtonClick

      "SensorViewWindow[ref=\"create\"] [ref=\"saveButton\"]":
        click: @createSensor

      "SensorViewWindow[ref=\"edit\"] [ref=\"saveButton\"]":
        click: @editSensor

    MsAdmin.Event.on "server.selected", @onServerSelected, this

  onServerSelected: (server) ->

  
  # server.sensors().un('update', this.onSensorUpdated);
  # server.sensors().on('update', this.onSensorUpdated);
  onSensorUpdated: (store, model, operation, eventOptions) ->
    if operation is Ext.data.Model.EDIT
      false
    else true  if operation is Ext.data.Model.COMMIT

  
  ###
  fires when user clicks on sensor
  ###
  onListItemClick: (grid, model, a, b) ->
    isIconClicked = Ext.EventObject.getTarget(".edit-link")
    return false  if isIconClicked
    MsAdmin.Event.fire "sensor.highlight", model

  onAddButtonClick: ->
    not @createWindow and (@createWindow = @getView("sensor.SensorViewWindow").create(
      ref: "create"
      title: "New Sensor Creation"
    ))
    MsAdmin.Event.fire "server.current",
      callback: (server) ->
        model = Ext.create("MsAdmin.model.Sensor",
          serverId: server.get("serverId")
        )
        @createWindow.getForm().loadRecord model
        @createWindow.center()
        @createWindow.show()

      scope: this


  getSensorUpdateConfig: ->
    success: @onSensorEditSuccess
    failure: @onSensorEditFailure
    scope: this

  getSensorCreateConfig: ->
    success: @onSensorSaveSuccess
    failure: @onSensorSaveFailure
    scope: this

  
  # onCellEdited: function(plugin, e) {
  # 	e.record.dirty && e.record.save(this.getSensorUpdateConfig());
  # },
  createSensor: ->
    form = @createWindow.getForm()
    model = form.getRecord()
    form.updateRecord model
    errors = model.validate()
    if errors.isValid() is false
      form.markInvalid errors
      return
    model.save @getSensorCreateConfig()

  editSensor: ->
    form = undefined
    model = undefined
    errors = undefined
    form = @getSensorEditForm().getForm()
    model = form.getRecord()
    form.updateRecord model
    errors = model.validate()
    if errors.isValid() is false
      form.markInvalid errors
      return
    if model.dirty
      model.save @getSensorUpdateConfig()
    else
      @getSensorEditWindow().close()

  onSensorEditSuccess: (tempModel, operation) ->
    model = operation.request.records[0]
    model.set tempModel.data
    model.commit true
    @editWindow.close()  if @editWindow
    MsAdmin.Event.fire "sensor.updateVisibility", model
    MsAdmin.Event.fire "notice",
      msg: "Sensor was successfully updated"


  onSensorEditFailure: (model, operation) ->
    errors = operation.getError()
    if @editWindow
      @markInvalid @editWindow.getForm(), errors
    else
      MsAdmin.Event.fire "notice",
        msg: errors or "Could't update sensor, errors occured"


  onSensorSaveSuccess: (tempRecord, operation) ->
    model = operation.records[0]
    server = @getStore("Servers").findRecord("serverId", model.get("serverId"))
    server.sensors().add model
    @createWindow.close()
    MsAdmin.Event.fire "notice",
      msg: "Sensor was successfully created"


  onSensorSaveFailure: (model, operation) ->
    errors = operation.getError()
    form = @createWindow.getForm()
    @markInvalid form, errors

  onDeleteButtonClick: ->
    model = @getSensorList().getSelectionModel().getSelection()[0]
    Ext.Msg.confirm "Delete A Sensor", "Are you really want to delete sensor", (->
      @onDeleteSensorConfirm model
    ), this

  onDeleteSensorConfirm: (model) ->
    model.destroy
      success: @onSensorDestroySuccess
      failure: @onSensorDestroyFailure
      scope: this


  
  ###
  fires when sensor was succesfully destroyed
  removes model from Store
  @param {MsAdmin.model.Sensor} tempModel
  @params {Ext.data.Operation} operation
  @returns {undefined}
  ###
  onSensorDestroySuccess: (tempModel, operation) ->
    model = operation.request.records[0]
    store = model.store
    MsAdmin.Event.fire "sensor.destroyed", model
    store.remove model
    MsAdmin.Event.fire "notice",
      msg: "Sensor was successfully removed"


  
  ###
  fires when errors occured in destroy-procedure
  @returns {undefined}
  ###
  onSensorDestroyFailure: (tempRecord, operation) ->
    MsAdmin.Event.fire "notice",
      msg: MsAdmin.constants.AJAX_ERROR_MSG


  
  ###
  shows sensor's edit-window
  @param {MsAdmin.model.Sensor} model
  @param {Integer} rIdx row-index
  @param {Integer} cIdx column-index
  @returns {undefined}
  ###
  onEditIconClick: (model, rIdx, cIdx) ->
    
    #renderTo: this.getViewport().getCenter().getEl(),
    not @editWindow and (@editWindow = @getView("sensor.SensorViewWindow").create(ref: "edit"))
    @editWindow.loadModel model
    @editWindow.center()
    @editWindow.show()

  
  ###
  fires when user clicks on active-icon
  changes active-state and saves model
  @param {MsAdmin.model.Sensor} model
  @param {Integer} rIdx row-index
  @param {Integer} cIdx column-index
  @retuns {undefined}
  ###
  onActiveIconClick: (model, rIdx, cIdx) ->
    model.set "active", Number(not model.get("active"))
    model.save success: (savedModel) ->
      MsAdmin.Event.fire "sensor.updateVisibility", model

