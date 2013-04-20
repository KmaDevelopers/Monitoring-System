Ext.define "MsAdmin.view.sensor.SensorListPanel",
  extend: "Ext.panel.Panel"
  alias: "widget.SensorListPanel"
  layout: "fit"
  title: "Sensors"
  constructor: (config) ->
    @callParent [Ext.applyIf(config or {},
      items: @getCmpItems()
      tools: @getCmpToolsConfig()
    )]

  getCmpToolsConfig: ->
    [
      ref: "addButton"
      xtype: "button"
      text: "+"
    ]

  getCmpItems: ->
    [
      layout: "fit"
      items: [xtype: "SensorList"]
    ]
