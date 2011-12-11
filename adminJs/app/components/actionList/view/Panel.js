Ext.define("app.components.actionList.view.Panel", {
	extend: "Ext.panel.Panel",
    layout: 'fit',
	constructor: function(config) {
		this.callParent([Ext.applyIf(config || {}, {
			items: this.getCmpItems(),
			dockedItems: this.getCmpDockedItems()
		})]);
	},
	getCmpDockedItems: function() {
		return [{
            xtype: "toolbar",
            dock: "bottom",
            items: [{
                ref: 'addBtn',
                text: "Add"
            }, {
                ref: 'delBtn',
                text: "Delete"
            }]
        }];
	},
	getCmpItems: function() {
		// return [{
  //           layout: 'fit',
  //           items: [{
  //           	xtype: "ServerList"
  //           }]
  //       }]
	}
});