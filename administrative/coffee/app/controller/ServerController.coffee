Ext.define "MsAdmin.controller.ServerController",
  extend: "Ext.app.Controller"
  mixins: ["MsAdmin.mixins.FormControllerMixin"]
  views: ["server.ServerList", "server.ServerListPanel", "server.ServerViewWindow", "server.ServerGraphicWindow"]
  stores: ["Servers", "Sensors"]
  models: ["Server"]
  refs: [
    ref: "ServerList"
    selector: "ServerList"
  ,
    ref: "SensorList"
    selector: "SensorList"
  ,
    ref: "Viewport"
    selector: "Viewport"
  ,
    ref: "ServerEditWindow"
    selector: "ServerViewWindow[ref=\"edit\"]"
  ,
    ref: "ServerCreateWindow"
    selector: "ServerViewWindow[ref=\"create\"]"
  ,
    ref: "ServerEditForm"
    selector: "ServerViewWindow[ref=\"edit\"] form"
  ,
    ref: "ServerCreateForm"
    selector: "ServerViewWindow[ref=\"create\"] form"
  ]
  editWindow: null
  init: ->
    @control
      ServerList:
        itemclick: @onListItemClick
        editiconclick: @onEditIconClick
        graphiciconclick: @onGraphicIconClick
        activeiconclick: @onActiveIconClick

      "ServerListPanel [ref=\"addBtn\"]":
        click: @onAddServerClick

      "ServerListPanel [ref=\"delBtn\"]":
        click: @onDeleteServerClick

      "ServerViewWindow[ref=\"edit\"] [ref=\"saveBtn\"]":
        click: @onUpdateServerInfoClick

      "ServerViewWindow[ref=\"edit\"] [ref=\"closeBtn\"]":
        click: ->
          @getServerEditWindow().close()

      "ServerViewWindow[ref=\"create\"] [ref=\"saveBtn\"]":
        click: @onCreateServerClick

      "ServerViewWindow[ref=\"create\"] [ref=\"closeBtn\"]":
        click: ->
          @getServerCreateWindow().close()

      "ServerGraphicWindow [ref=\"SensorCombo\"]":
        change: @onSensorComboChanged

    @getStore("Servers").on "load", @onDataLoad, this
    MsAdmin.Event.on "server.current", @getCurrentServer, this

  onSensorComboChanged: (field) ->
    MsAdmin.Event.fire "graphic.rerender", field.getValue()

  onGenerateGraphicClick: ->

  onGraphicIconClick: (model) ->
    @graphicWindow = @getView("server.ServerGraphicWindow").create()  if @graphicWindow is `undefined`
    @graphicWindow.loadModel model
    @graphicWindow.center()
    @graphicWindow.show()
    @getServerList().actionClicked = true

  getCurrentServer: (config) ->
    model = @getServerList().getSelectionModel().getSelection()[0]
    config.callback.call config.scope or window, model

  onListItemClick: (grid, item) ->
    @showSensors item

  showSensors: (server) ->
    newStore = server.sensors()
    sensorList = @getSensorList()
    sensorList.reconfigure newStore, sensorList.initialConfig.columns
    MsAdmin.Event.fire "server.selected", server

  onDataLoad: (store) ->
    return  if store.getCount() is 0
    serverList = @getServerList()
    serverList.getSelectionModel().select 0
    @showSensors store.getAt(0)

  onEditIconClick: (model, rIdx, cIdx) ->
    @editWindow = @getView("server.ServerViewWindow").create(ref: "edit")  if @editWindow is `undefined`
    @editWindow.loadModel model
    @editWindow.center()
    @editWindow.show()
    @getServerList().actionClicked = true

  onActiveIconClick: (model, rIdx, cIdx) ->
    model.set "active", Number(not model.get("active"))
    model.save success: ->
      sensors = model.sensors()
      sensors.each (sensor) ->
        sensor.set "active", model.get("active")

      sensors.sync callback: ->
        MsAdmin.Event.fireEvent "server.selected", model



  onUpdateServerInfoClick: ->
    form = undefined
    model = undefined
    errors = undefined
    form = @getServerEditForm().getForm()
    model = form.getRecord()
    form.updateRecord model
    errors = model.validate()
    if errors.isValid() is false
      form.markInvalid errors
      return
    model.dirty and model.save(
      scope: this
      success: @onServerSaveSuccess
      failure: @onServerSaveFailure
    )

  onServerSaveSuccess: (model) ->
    
    #this.getServerEditForm().getForm().loadRecord(model);
    @getServerEditWindow().close()
    MsAdmin.Event.fire "notice",
      msg: "Server information was successfully updated"


  onServerSaveFailure: (record, operation) ->
    errors = operation.getError()
    form = @editWindow.getForm()
    @markInvalid form, errors

  onAddServerClick: ->
    not @createWindow and (@createWindow = @getView("server.ServerViewWindow").create(
      
      #renderTo: this.getViewport().getCenter().getEl(),
      ref: "create"
      title: "New Server Creation"
    ))
    @getServerCreateForm().getForm().loadRecord Ext.create("MsAdmin.model.Server")
    @createWindow.center()
    @createWindow.show()

  onDeleteServerClick: ->
    item = @getServerList().getSelectionModel().getSelection()[0]
    Ext.Msg.confirm "Delete A Server", "Are you really want to delete server " + item.get("name"), ((result) ->
      (result is "yes") and @onDeleteServerConfirm(item)
    ), this

  onDeleteServerConfirm: (model) ->
    store = @getStore("Servers")
    store.remove model
    store.destroy
      callback: @onModelDestroySuccess
      failure: ->
        @eventbus.fireEvent "global.Error",
          msg: "ERROR"


      scope: this


  onModelDestroySuccess: (model, operation) ->
    MsAdmin.Event.fire "notice",
      msg: "Server " + operation.request.records[0].get("name") + " information was successfully updated"


  onCreateServerClick: ->
    form = @getServerCreateForm().getForm()
    model = form.getRecord()
    form.updateRecord model
    erorrs = model.validate()
    if erorrs.isValid() is false
      form.markInvalid erorrs
      return
    model.save
      success: @onCreateServerSuccess
      failure: @onCreateServerFailure
      scope: this


  onCreateServerSuccess: (model) ->
    servers = @getStore("Servers")
    servers.add model
    MsAdmin.Event.fire "notice",
      msg: "Server was successfully created"

    @getServerCreateWindow().close()
    if servers.getCount() is 1
      @getServerList().getSelectionModel().select 0
      @showSensors model

  onCreateServerFailure: (record, operation) ->
    errors = operation.getError()
    form = @getServerCreateForm().getForm()
    @markInvalid form, errors
