Ext.define "MsAdmin.view.sensor.Sensor",
  extend: "Ext.container.Container"
  width: 40
  height: 40
  cls: "sensor"
  alias: "widget.Sensor"
  constructor: (config) ->
    @loadModel config.model
    @applyStyles()
    @addEvents click: true
    @listeners = render: @initialize
    @callParent arguments_

  loadModel: (record) ->
    @record = record

  applyStyles: (coords) ->
    @style =
      backgroundImage: "url('" + MsAdmin.constants.SENSOR_IMAGE_SRC + "')"
      backgroundColor: "transparent"
      backgroundRepeat: "no-repeat"
      backgroundSize: 45
      cursor: "pointer"
      position: "absolute"
      top: @record.get("y") + "px"
      left: @record.get("x") + "px"

  initialize: ->
    @addDD()
    @addCounter()
    @listenEvents()

  addDD: (container) ->
    me = this
    @dragZone = Ext.create("Ext.dd.DDProxy", @getEl(), "sensor")
    @dragZone.endDrag = ((me) ->
      me
      (e) ->
        lel = @getEl()
        del = @getDragEl()
        
        # Show the drag frame briefly so we can get its position
        del.style.visibility = ""
        @beforeMove()
        
        # Hide the linked element before the move to get around a Safari
        # rendering bug.
        lel.style.visibility = "hidden"
        Ext.dd.DDM.moveToEl lel, del
        del.style.visibility = "hidden"
        lel.style.visibility = ""
        @afterDrag()
        lel = Ext.fly(lel)
        me.getModel().set
          x: lel.getLeft(true)
          y: lel.getTop(true)

    )(me)

  addCounter: ->
    marginLeft = @width or @el.getWidth()

  
  # Ext.core.DomHelper.append(
  # this.el.dom.id, {
  #     style: "font-size:20px;color:white;font-weight:bold;margin-left:-10px" ,
  #     id: "bla",
  #     tag: "div",
  #     html: '1'
  # });
  listenEvents: ->
    @el.on "click", (->
      @fireEvent "click", this
    ), this

  getModel: ->
    @model
