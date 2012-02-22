Ext.define("MsAdmin.view.server.ServerGraphicWindow", {
	extend: "Ext.window.Window",
	border: false,
	alias: 'widget.ServerGraphicWindow',
	constrain: true,
	autoShow: true,
	minimizable: true,
	maximizable: true,
	closeAction: 'hide',
	modal: true,
	requires: [
		'MsAdmin.view.server.TemperatureGraphic'
	],
	constructor: function(config) {
		var size = .95;

		this.callParent([
			Ext.applyIf(config || {}, {
				layout: "fit",
				listeners: {
					beforeshow: function() {
						this.setSize(
							Ext.getBody().getViewSize().width * size, 
							Ext.getBody().getViewSize().height * size
						);
					},
					show: function() {
						this.center();
					}
				},
				dockedItems: this.getCmpDockedItems(),
				items: this.getCmpItems(),
				buttons: this.getCmpButtons()
			}),
		]);
	},
	loadModel: function(model) {
		this.setTitle('Server ' + model.get('name'));
		var sensorCombo = this.down("[ref='SensorCombo']");
		this.removeAll(true);

		var chart = this.add({
			xtype: "TemperatureGraphic",
			style: 'background:#fff',
            animate: true,
            shadow: true,
            //theme: 'Category1',
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Numeric',
                minimum: 0,
                position: 'left',
                fields: ['sensor0', 'sensor1', 'sensor2'],
                title: 'Temperature',
                minorTickSteps: 1,
                grid: {
                    odd: {
                        opacity: 1,
                        fill: '#ddd',
                        stroke: '#bbb',
                        'stroke-width': 0.5
                    }
                }
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: 'Month of the Year',
                label: {
                    rotate: {
                        degrees: 315
                    }
	            }
            }],
            series: [{
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'name',
                fill: false,
                yField: 'sensor0',
                markerConfig: {
                    type: 'cross',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }, {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                smooth: true,
                xField: 'name',
                fill: false,
                yField: 'sensor1',
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }, {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                smooth: true,
                fill: false,
                xField: 'name',
                yField: 'sensor2',
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }],
	        store: Ext.create("Ext.data.Store", {
				fields: [
					'name', 
					'sensor0',
					'sensor1',
					'sensor2',
					'sensor3',
					'sensor4'
				],
				proxy: {
					type: "ajax",
					url: "./adminJs/app/mock/stats.php",
					reader: {
						type: "json",
						root: "items"
					}
				},
				autoLoad: true
			})
		});

        // var fields = [];
        // model.sensors().each(function(sensor) {
        // 	fields.push(sensor.get('serial'));
        // });

        // chart.axes.addAll();

        // chart.series.addAll();

        //chart.bindStore();

		//sensorCombo.bindStore(model.sensors());
	},

	getCmpDockedItems: function() {
		return [{
			xtype: "toolbar",
			items: [/*{
				xtype: "combo",
				displayField: "serial",
				valueField: "sensorId",
				fieldLabel: "Sensors",
				ref: "SensorCombo",
				multiSelect: true,
				width: 500
			},*/ '->', {
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
				handler: this.onRenderButtonClick,
				ref: 'renderGraphicsButton'
			}]
		}]
	},

	onRenderButtonClick: function(button) {
		var toolbar = button.up("toolbar");
		var startDate = toolbar.down("[als=startDateField]").getValue();
		var startTime = toolbar.down("[als=startTimeField]").getValue();
		var endDate = toolbar.down("[als=endDateField]").getValue();
		var endTime = toolbar.down("[als=endTimeField]").getValue();

		button.up("window").down('TemperatureGraphic').store.load({
			params: {
				startDate: Ext.Date.format(startDate, 'Y-m-d') + " " + Ext.Date.format(startTime, 'H:i:s'),
				endDate: Ext.Date.format(endDate, 'Y-m-d') + " " + Ext.Date.format(endTime, 'H:i:s')
			}
		});
	},

	getCmpItems: function() {
		return [];
	},
	getCmpButtons: function() {
		return [{
			ref: 'generateBtn',
			text: "Generate"
		}, {
			ref: 'closeBtn',
			text: "Close",
			handler: function(button) {
				button.up("window").close();
			}
		}]
	},

	getForm: function() {
		return this.down('form').getForm();
	}
});