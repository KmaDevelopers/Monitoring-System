Ext.define "MsAdmin.view.server.ServerList",
  extend: "MsAdmin.core.widget.EditList"
  store: "Servers"
  alias: "widget.ServerList"
  constructor: (config) ->
    @callParent [Ext.applyIf(config or {},
      columns: [
        flex: .7
        tdCls: "list-td"
        header: "Name"
        dataIndex: "name"
      , @getEditActionColumn()]
    )]
    @addEvents editiconclick: true

  getEditActionColumn: ->
    xtype: "actioncolumn"
    tdCls: "list-td edit-link"
    align: "center"
    flex: .3
    items: [
      icon: MsAdmin.constants.IMAGE_PATH + "graphic-icon.png" # Use a URL in the icon config
      tooltip: "Show Graphic"
      handler: @onIconClick("graphic")
      scope: this
      getClass: ->
        "graphic-icon"
    ,
      icon: MsAdmin.constants.IMAGE_PATH + "edit-icon.png" # Use a URL in the icon config
      tooltip: "Edit"
      handler: @onIconClick("edit")
      scope: this
      getClass: ->
        "edit-icon"
    ,
      tooltip: "Active"
      handler: @onIconClick("active")
      getClass: (htmlEl, meta, record) ->
        (if record.get("active") is 0 then "inactive-icon" else "active-icon")

      scope: this
    ]
