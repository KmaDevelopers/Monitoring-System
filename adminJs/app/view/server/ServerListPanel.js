Ext.define("MsAdmin.view.server.ServerListPanel", {
	extend: "Ext.panel.Panel",
	alias: 'widget.ServerListPanel',
    layout: 'fit',
    title: "Servers",
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
		return [{
            layout: 'fit',
            items: [{
            	xtype: "ServerList"
            }]
        }]
	}
});