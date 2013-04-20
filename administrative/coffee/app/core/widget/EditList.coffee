Ext.define "MsAdmin.core.widget.EditList",
  extend: "Ext.grid.Panel"
  plugins: [ptype: "cellediting"]
  
  # requires: [
  #     'Ext.grid.plugin.EditingView'
  # ],
  constructor: (config) ->
    @callParent [Ext.applyIf(config or {},
      actionClicked: false
      listeners:
        beforeitemclick: @onBeforeItemClick
    )]

  onBeforeItemClick: ->
    if @actionClicked
      @actionClicked = false
      false

  getEditActionColumn: ->
    xtype: "actioncolumn"
    tdCls: "list-td edit-link"
    align: "center"
    flex: .3
    items: [
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

  onIconClick: (actionName) ->
    (grid, rIdx, cIdx) ->
      
      # var selModel = this.getSelectionModel();
      #     selModel.select(rIdx);
      @fireEvent actionName + "iconclick", grid.getStore().getAt(rIdx), rIdx, cIdx

  getActiveActionColumn: ->
    flex: 0.1
    header: "Active"
    align: "center"
    dataIndex: "active"
    editor:
      inputValue: 1
      xtype: "checkbox"
