Ext.define "app.components.actionList.view.List",
  extend: "Ext.grid.Panel"
  constructor: ->
    @addEvents editiconclick: true

  getEditActionColumn: ->
    xtype: "actioncolumn"
    tdCls: "list-td edit-link"
    align: "center"
    flex: .3
    items: [
      icon: MsAdmin.constants.IMAGE_PATH + "edit-icon.png" # Use a URL in the icon config
      tooltip: "Edit"
      handler: @onEditIconClick
      scope: this
    ]

  onEditIconClick: (grid, rIdx, cIdx) ->
    selModel = @getSelectionModel()
    selModel.select rIdx
    @fireEvent "editiconclick", selModel.getSelection()[0], rIdx, cIdx
