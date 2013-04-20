Ext.define "app.components.layout.view.Viewport",
  extend: "Ext.Viewport"
  layout: "border"
  autoRender: true
  alias: "widget.Viewport"
  defaults:
    slit: true
    border: false

  constructor: (config) ->
    @callParent [Ext.apply(config or {},
      items: @getItems()
    )]

  getItems: ->
    [
      width: 300
      region: "west"
      xtype: "panel"
      layout:
        type: "fit"

      items:
        xtype: "ListsContainer"
    ,
      region: "center"
    ]

  getCenter: ->
    @down "[region=\"center\"]"
