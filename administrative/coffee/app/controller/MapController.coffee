Ext.define "MsAdmin.controller.MapController",
  extend: "Ext.app.Controller"
  views: ["sensor.Sensor", "map.MapLayout"]
  refs: [
    ref: "MapLayout"
    selector: "MapLayout"
  ]
  init: ->
    @control
      "[ref=\"savePosButton\"]":
        click: @onSavePositionClick

      "[ref=\"MapZoomSlider\"]":
        change: @doMapZoom

    MsAdmin.Event.on "server.selected", @renderSensors, this
    MsAdmin.Event.on "sensor.highlight", @highlightSensor, this
    MsAdmin.Event.on "map.sensor.add", @addSensor, this
    MsAdmin.Event.on "sensor.destroyed", @removeSensor, this
    MsAdmin.Event.on "sensor.updateVisibility", @updateSensorVisibility, this

  doMapZoom: (field) ->
    value = field.getValue()
    mapBox = @getMapLayout().down("[ref=\"map\"]")
    toConfig =
      width: (mapBox.origin.width + value) + "%"
      height: (mapBox.origin.height + value) + "%"

    mapBox.animate
      to: toConfig
      duration: 0


  onSavePositionClick: ->
    @server.sensors().sync()

  updateSensorVisibility: (model) ->
    @eachSensor (item) ->
      if item.getModel() is model
        if model.get("active") is 1
          item.getEl().show()
          item.getEl().frame "red", 1
        else
          if item.getEl().isVisible()
            item.getEl().frame "black", 1
            
            #TODO because of YABIE
            setTimeout (->
              item.getEl().hide()
            ), 1000


  addSensor: (sensor) ->
    exists = false
    @eachSensor (item) ->
      if sensor is item.getModel()
        exists = true
        false

    if exists
      MsAdmin.Event.fire "notice",
        msg: MsAdmin.t("Sensor is already on map")

      return false
    item = @getMapLayout().add(
      xtype: "Sensor"
      model: sensor
    )
    item.hide()  unless sensor.get("active")

  removeSensor: (model) ->
    @eachSensor (item) ->
      if item.getModel() is model
        item.getEl().frame "black", 1
        
        # because of YABIE
        setTimeout (->
          item.destroy()
        ), 1000


  renderSensors: (server) ->
    @server = server
    Ext.each @getMapLayout().query("Sensor"), (item) ->
      item.destroy()

    server.sensors().each ((sensor) ->
      @addSensor sensor
    ), this

  
  ###
  highlight selected sensor
  ###
  highlightSensor: (sensor) ->
    @eachSensor (item) ->
      if item.getModel() is sensor
        item.getEl().isVisible() and item.getEl().frame("red")
        return


  eachSensor: (fn) ->
    Ext.each @getMapLayout().query("Sensor"), fn, this
