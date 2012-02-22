Ext.define("MsAdmin.view.server.TemperatureGraphic", {
	alias: "widget.TemperatureGraphic",
	extend: "Ext.chart.Chart",
	requires: [
		'Ext.chart.*'
	],
	constructor: function(config) {
		this.callParent([
			Ext.applyIf(config || {}, {
				animate: true,
				legend: {
                	position: 'bottom'
            	}
			})
		]);
	}
});