Ext.define "MsAdmin.view.server.ServerGraphicWindow",
  extend: "Ext.window.Window"
  border: false
  alias: "widget.ServerGraphicWindow"
  constrain: true
  autoShow: true
  minimizable: true
  maximizable: true
  closeAction: "hide"
  modal: true
  requires: ["MsAdmin.view.server.TemperatureGraphic"]
  constructor: (config) ->
    size = .95
    @callParent [Ext.applyIf(config or {},
      layout: "fit"
      listeners:
        beforeshow: ->
          @setSize Ext.getBody().getViewSize().width * size, Ext.getBody().getViewSize().height * size

        show: ->
          @center()

      dockedItems: @getCmpDockedItems()
      items: @getCmpItems()
      buttons: @getCmpButtons()
    )]

  getSeriesConfig: (fields) ->
    series = []
    Ext.each fields, (serial) ->
      series.push
        type: "line"
        highlight:
          size: 7
          radius: 7

        axis: "left"
        xField: "name"
        fill: false
        yField: serial
        markerConfig:
          type: "cross"
          size: 4
          radius: 4
          "stroke-width": 0


    series

  loadModel: (model) ->
    @model = model
    sensorCombo = @down("[ref='SensorCombo']")
    @setTitle "Server " + model.get("name")
    @removeAll true
    fields = []
    model.sensors().each (sensor) ->
      fields.push sensor.get("serial")

    @storeFields = fields
    chart = @add(
      xtype: "TemperatureGraphic"
      style: "background:#fff"
      animate: true
      shadow: true
      
      #theme: 'Category1',
      legend:
        position: "right"

      axes: [
        type: "Numeric"
        minimum: 0
        position: "left"
        fields: fields
        title: "Temperature"
        minorTickSteps: 1
        grid:
          odd:
            opacity: 1
            fill: "#ddd"
            stroke: "#bbb"
            "stroke-width": 0.5
      ,
        type: "Category"
        position: "bottom"
        fields: ["name"]
        title: "Time axes"
        label:
          rotate:
            degrees: 315
      ]
      series: @getSeriesConfig(fields)
      store: (->
        store = Ext.create("Ext.data.Store",
          fields: (->
            modelFields = []
            Ext.each fields, (field) ->
              modelFields.push
                name: field
                type: "float"


            modelFields
          )().concat(["name"])
          proxy:
            type: "ajax"
            url: "/admin/chart"
            
            #url: "./adminJs/app/mock/stats.php",
            reader:
              type: "json"
              root: "items"

            extraParams:
              filter: Ext.encode(
                startDate: Ext.Date.format(new Date(Ext.Date.now() - 1000 * 60 * 120), "Y-m-d H:i:s")
                endDate: Ext.Date.format(new Date(), "Y-m-d H:i:s")
                sensorIds: (->
                  ids = []
                  model.sensors().each (sensor) ->
                    ids.push sensor.get("sensorId")

                  ids
                )()
              )

          autoLoad: true
        )
        store
      )()
    )
    chart.store.getProxy().extraParams = {}

  getCmpDockedItems: ->
    [
      xtype: "toolbar"
      ref: "filter"
      items: ["->",
        xtype: "datefield"
        ref: "filterField"
        als: "startDateField"
        format: "Y-m-d"
        fieldLabel: "Start date"
        value: (new Date(Ext.Date.now() - 1000 * 60 * 120))
      , " ",
        xtype: "datefield"
        als: "endDateField"
        ref: "filterField"
        format: "Y-m-d"
        fieldLabel: "End date"
        value: (new Date())
      , " ",
        xtype: "timefield"
        als: "startTimeField"
        ref: "filterField"
        fieldLabel: "Start time"
        format: "H:i"
        increment: 30
        value: (new Date(Ext.Date.now() - 1000 * 60 * 120))
      ,
        xtype: "timefield"
        als: "endTimeField"
        ref: "filterField"
        format: "H:i"
        increment: 30
        fieldLabel: "End time"
        value: (new Date())
      , "->",
        xtype: "button"
        text: "Render"
        scope: this
        handler: @onRenderButtonClick
        ref: "renderGraphicsButton"
      ]
    ]

  onRenderButtonClick: (button) ->
    toolbar = button.up("toolbar")
    chart = button.up("window").down("TemperatureGraphic")
    store = chart.store
    sensors = @model.sensors()
    sensorIds = []
    fields = @storeFields
    chart.series.each ((item, index) ->
      serial = fields[index]
      sensorId = sensors.getAt(sensors.findExact("serial", serial)).get("sensorId")
      sensorIds.push sensorId
    ), this
    store.getProxy().extraParams = {}
    store.load
      params:
        filter: Ext.encode(
          startDate: @getStartDate()
          endDate: @getEndDate()
          sensorIds: sensorIds
        )

      callback: ((store) ->
        (me) ->
          store.removeAll()  if store.getCount() is 0
      )(store)


  getStartDate: ->
    toolbar = @down("toolbar[ref='filter']")
    startDate = toolbar.down("[als=startDateField]").getValue()
    startTime = toolbar.down("[als=startTimeField]").getValue()
    endDate = toolbar.down("[als=endDateField]").getValue()
    endTime = toolbar.down("[als=endTimeField]").getValue()
    Ext.Date.format(startDate, "Y-m-d") + " " + Ext.Date.format(startTime, "H:i:s")

  getEndDate: ->
    toolbar = @down("toolbar[ref='filter']")
    startDate = toolbar.down("[als=startDateField]").getValue()
    startTime = toolbar.down("[als=startTimeField]").getValue()
    endDate = toolbar.down("[als=endDateField]").getValue()
    endTime = toolbar.down("[als=endTimeField]").getValue()
    Ext.Date.format(endDate, "Y-m-d") + " " + Ext.Date.format(endTime, "H:i:s")

  getCmpItems: ->
    []

  getCmpButtons: ->
    [
      ref: "generateXLSBtn"
      text: "Generate XLS"
      scope: this
      handler: @generateXLS
    ,
      ref: "generateBtn"
      text: "Generate PDF"
      scope: this
      handler: @generateGpaphic
    ,
      ref: "closeBtn"
      text: "Close"
      handler: (button) ->
        button.up("window").close()
    ]

  generateXLS: ->
    debugger
    chart = @down("chart")
    fields = @storeFields
    filters = []
    model = @model
    sensors = model.sensors()
    chart.series.each ((item, index) ->
      if item.visibleInLegend()
        serial = fields[index + 1]
        sensorId = sensors.getAt(sensors.findExact("serial", serial)).get("sensorId")
        filters.push sensorId
    ), this
    Ext.Ajax.request
      url: "/chart/generate/xls"
      params:
        startDate: @getStartDate()
        endDate: @getEndDate()
        filter: Ext.encode(sensorIds: filters)

      success: (response) ->
        result = Ext.decode(response, true)
        window.location = result.src  if result?


  generateGpaphic: ->
    chart = @down("chart")
    fields = @storeFields
    filters = []
    model = @model
    sensors = model.sensors()
    chart.series.each ((item, index) ->
      if item.visibleInLegend()
        serial = fields[index + 1]
        sensorId = sensors.getAt(sensors.findExact("serial", serial)).get("sensorId")
        filters.push sensorId
    ), this
    Ext.Ajax.request
      url: "/chart/generate/pdf"
      params:
        startDate: @getStartDate()
        endDate: @getEndDate()
        filter: Ext.encode(sensorIds: filters)

      success: (response) ->
        result = Ext.decode(response, true)
        window.location = result.src  if result?


  getForm: ->
    @down("form").getForm()
