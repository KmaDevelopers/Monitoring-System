Ext.define("MsAdmin.view.sensor.SensorListPanel", {
	extend: "Ext.panel.Panel",
	alias: 'widget.SensorListPanel',
    layout: 'fit',
    title: "Sensors",
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
                text: "Add"
            }, {
                text: "Delete"
            }]
        }];
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