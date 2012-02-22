Ext.define("MsAdmin.view.server.ServerListPanel", {
	extend: "Ext.panel.Panel",
	alias: 'widget.ServerListPanel',
    layout: 'fit',
    title: "Servers",
    
	constructor: function(config) {
		this.callParent([Ext.applyIf(config || {}, {
			items: this.getCmpItems(),
            tools: this.getCmpToolsConfig()
		})]);
	},

    getCmpToolsConfig: function() {
        return [{
            ref: 'addBtn',
            xtype: "button",
            text: "+"
        }]  
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