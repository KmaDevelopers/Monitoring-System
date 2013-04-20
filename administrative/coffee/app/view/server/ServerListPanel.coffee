Ext.define "MsAdmin.view.server.ServerListPanel",
  extend: "Ext.panel.Panel"
  alias: "widget.ServerListPanel"
  layout: "fit"
  title: "Servers"
  constructor: (config) ->
    @callParent [Ext.applyIf(config or {},
      items: @getCmpItems()
      tools: @getCmpToolsConfig()
    )]

  getCmpToolsConfig: ->
    [
      ref: "addBtn"
      xtype: "button"
      text: "+"
    ]

  getCmpItems: ->
    [
      layout: "fit"
      items: [xtype: "ServerList"]
    ]
