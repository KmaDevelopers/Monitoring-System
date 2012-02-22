Ext.define("MsAdmin.view.sensor.SensorListPanel", {
	extend: "Ext.panel.Panel",
	alias: 'widget.SensorListPanel',
    layout: 'fit',
    title: "Sensors",
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
            	xtype: "SensorList"
            }]
        }]
	}
});