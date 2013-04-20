Ext.define "MsAdmin.view.map.MapLayout",
  extend: "Ext.panel.Panel"
  alias: "widget.MapLayout"
  bodyStyle:
    overflow: "auto"
    position: "relative"

  bodyCls: "map-body"
  constructor: (config) ->
    @callParent [Ext.applyIf(config or {},
      layout: "auto"
      items:
        origin:
          width: 500
          height: 300

        xtype: "box"
        ref: "map"
        autoEl:
          tag: "img"
          src: MsAdmin.constants.BG_IMAGE_SRC
          style:
            width: "1000px"
            height: "600px"

      listeners:
        render: @attachDD

      dockedItems: @getCjDockedItemsConfig()
    )]

  getCjDockedItemsConfig: ->
    [
      dock: "bottom"
      xtype: "toolbar"
      items: [
        hidden: true
        fieldLabel: "zoom"
        ref: "MapZoomSlider"
        xtype: "slider"
        width: 300
        value: 250
        increment: 5
        minValue: 0
        maxValue: 2000
      , "->",
        xtype: "button"
        ref: "savePosButton"
        text: "Save position"
      ,
        xtype: "button"
        ref: "refreshBtn"
        text: "Refresh"
      ]
    ]

  attachDD: (panel) ->
    @dd = Ext.create("Ext.dd.DropZone", @getEl(),
      view: this
      ddGroup: "sensor-map"
      getTargetFromEvent: (e) ->
        e.getTarget ".map-body"

      onNodeOver: (node, dropZone, e, data) ->
        dropZone.position = @getPositon(e)
        Ext.dd.DropZone::dropAllowed

      getPositon: (e) ->
        x = e.getPageX()
        y = e.getPageY()
        leftOffset = @view.getEl().getLeft()
        [x - leftOffset, y]

      onNodeDrop: (node, dropZone, e, data) ->
        record = data.records[0]
        record.set "x", dropZone.position[0]
        record.set "y", dropZone.position[1]
        MsAdmin.Event.fire "map.sensor.add", record
    )
