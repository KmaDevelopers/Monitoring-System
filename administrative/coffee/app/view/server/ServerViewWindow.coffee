Ext.define "MsAdmin.view.server.ServerViewWindow",
  extend: "Ext.window.Window"
  border: false
  alias: "widget.ServerViewWindow"
  constrain: true
  autoShow: true
  minimizable: true
  maximizable: true
  closeAction: "hide"
  layout: "fit"
  modal: true
  constructor: (config) ->
    @callParent [Ext.applyIf(config or {},
      buttons: @getCmpButtons()
      items: @getCmpItems()
    )]

  loadModel: (model) ->
    @setTitle "Server " + model.get("name")
    @down("form").getForm().loadRecord model

  getCmpItems: ->
    [
      border: true
      xtype: "form"
      bodyPadding: 15
      defaults:
        labelWidth: 120
        xtype: "textfield"
        anchor: "95%"

      layout: "anchor"
      items: [
        name: "name"
        fieldLabel: MsAdmin.t("Server Name")
      ,
        name: "path"
        fieldLabel: MsAdmin.t("Path")
      ,
        name: "ip"
        fieldLabel: MsAdmin.t("Server IP Address")
      ]
    ]

  getCmpButtons: ->
    [
      ref: "saveBtn"
      text: "Save"
    ,
      ref: "closeBtn"
      text: "Close"
    ]

  getForm: ->
    @down("form").getForm()
