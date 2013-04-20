Ext.define "app.controller.SensorController",
  extend: "Ext.app.Controller"
  mixins: ["app.mixins.FormControllerMixin"]
  views: ["sensor.SensorList", "sensor.SensorViewWindow", "sensor.SensorListPanel"]
  stores: ["Sensors"]
  models: ["Sensor"]
  refs: [
    ref: "Viewport"
    selector: "Viewport"
  ,
    ref: "SensorList"
    selector: "SensorList"
  ]
  init: ->
    @control
      SensorList:
        itemclick: @onListItemClick
        editiconclick: @onEditIconClick

      "SensorListPanel [ref=\"addButton\"]":
        click: @onAddButtonClick

      "SensorListPanel [ref=\"deleteButton\"]":
        click: @onDeleteButtonClick

      "SensorViewWindow[ref=\"create\"] [ref=\"saveButton\"]":
        click: @createSensor


  onListItemClick: (grid, model) ->

  onAddButtonClick: ->
    not @createWindow and (@createWindow = @getView("sensor.SensorViewWindow").create(
      ref: "create"
      title: "New Sensor Creation"
      renderTo: @getViewport().getCenter().getEl()
    ))
    app.Event.fire "server.current",
      callback: (server) ->
        model = Ext.create("app.model.Sensor",
          serverId: server.get("id")
        )
        @createWindow.getForm().loadRecord model
        @createWindow.center()
        @createWindow.show()

      scope: this


  createSensor: ->
    form = @createWindow.getForm()
    model = form.getRecord()
    form.updateRecord model
    errors = model.validate()
    if errors.isValid() is false
      form.markInvalid errors
      return
    model.save
      success: @onSensorSaveSuccess
      failure: @onSensorSaveFailure
      scope: this


  onSensorSaveSuccess: (model) ->
    server = @getStore("Servers").findRecord("id", model.get("serverId"))
    server.sensors().add model
    @createWindow.close()
    app.Event.fire "notice",
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


  onSensorDestroySuccess: (model, operation) ->
    model = operation.request.records[0]
    model.store.remove model
    app.Event.fire "notice",
      msg: "Sensor was successfully removed"


  onSensorDestroyFailure: (model, operation) ->
    app.Event.fire "notice",
      msg: "Could't not remove server"


  onEditIconClick: (model, rIdx, cIdx) ->
    not @editWindow and (@editWindow = @getView("sensor.SensorViewWindow").create(
      renderTo: @getViewport().getCenter().getEl()
      ref: "edit"
    ))
    @editWindow.loadModel model
    @editWindow.center()
    @editWindow.show()
