Ext.define("MsAdmin.controller.SensorController", {
	extend: "Ext.app.Controller",
	views: [
		'sensor.SensorList',
		'sensor.SensorListPanel'
	],
	stores: [
		'Sensors'
	],
	init: function() {
		this.control({
			'SensorList': {
				itemclick: this.onListItemClick
			},
			'SensorListPanel [ref="addBtn"]': {
				
			},
			'SensorListPanel [ref="delBtn"]': {
				
			}
		});
	},
	onListItemClick: function(grid, item) {
		alert('clicked')
	}
});