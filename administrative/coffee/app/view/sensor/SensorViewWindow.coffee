Ext.define "MsAdmin.view.sensor.SensorViewWindow",
  extend: "Ext.window.Window"
  alias: "widget.SensorViewWindow"
  border: false
  modal: true
  constructor: (config) ->
    @callParent [Ext.applyIf(config or {},
      closeAction: "hide"
      layout: "fit"
      autoShow: true
      buttons: @getCmpButtons()
      items: @getItemsConfig()
    )]

  loadModel: (model) ->
    @setTitle "Sensor " + model.get("name")
    @down("form").getForm().loadRecord model

  getCmpButtons: ->
    [
      text: MsAdmin.t("Save")
      ref: "saveButton"
    ,
      text: MsAdmin.t("Close")
      ref: "closeButton"
      handler: ->
        @up("window").close()
    ]

  getItemsConfig: ->
    [
      xtype: "form"
      bodyPadding: 15
      defaults:
        labelWidth: 120

      layout: "anchor"
      defaults:
        anchor: "95%"

      items: [
        xtype: "textfield"
        name: "name"
        fieldLabel: MsAdmin.t("Name")
      ,
        xtype: "textfield"
        name: "position"
        fieldLabel: MsAdmin.t("Position")
      ,
        xtype: "textfield"
        name: "serial"
        fieldLabel: MsAdmin.t("Serial")
      ]
    ]

  getForm: ->
    @down("form").getForm()
