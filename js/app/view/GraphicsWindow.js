Ext.define('KMA.view.GraphicsWindow', {
	extend: "Ext.window.Window",
	maximizable: true,
	alias: 'widget.GraphicsWindow',
	width: 980,
	height: 600,
	constructor: function(config) {
		Ext.applyIf(config, {
			layout: 'fit',
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				style: 'padding:10px',
				defaults: {
					labelWidth: 60
				},
				items: [' ', {
					xtype: 'datefield',
					ref: 'filterField',
					als: 'startDateField',
					format: 'Y-m-d',
					fieldLabel: 'Start date',
					value: (new Date())
				},' ', {
					xtype: 'datefield',
					als: 'endDateField',
					ref: 'filterField',
					format: 'Y-m-d',
					fieldLabel: 'End date',
					value: (new Date())
				}, ' ',  {
					xtype: 'timefield',
					als: 'startTimeField',
					ref: 'filterField',
					fieldLabel: 'Start time',
					format: 'H:i',
					increment: 30,
					value: '08:00'
				}, {
					xtype: 'timefield',
					als: 'endTimeField',
					ref: 'filterField',
					format: 'H:i',
					increment: 30,
					fieldLabel: 'End time',
					value: '22:00'
				},'->', {
					xtype: 'button',
					text: 'Render',
					ref: 'renderGraphicsButton'
				}]
			}],
			items: [{
				store: config.store,
				xtype: 'SensorStatisticsChart'
			}]
		});
		this.callParent([config]);
	}
});