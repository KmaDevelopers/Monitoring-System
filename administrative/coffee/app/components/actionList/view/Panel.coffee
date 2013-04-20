Ext.define "app.components.actionList.view.Panel",
  extend: "Ext.panel.Panel"
  layout: "fit"
  constructor: (config) ->
    @callParent [Ext.applyIf(config or {},
      items: @getCmpItems()
      dockedItems: @getCmpDockedItems()
    )]

  getCmpDockedItems: ->
    [
      xtype: "toolbar"
      dock: "bottom"
      items: [
        ref: "addBtn"
        text: "Add"
      ,
        ref: "delBtn"
        text: "Delete"
      ]
    ]

  getCmpItems: ->


# return [{
#           layout: 'fit',
#           items: [{
#           	xtype: "ServerList"
#           }]
#       }]