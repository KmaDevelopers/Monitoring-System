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

	getSeriesConfig: function(fields) {
		var series = [];	

		Ext.each(fields, function(serial) {
			series.push({
				type: 'line',
	            highlight: {
	                size: 7,
	                radius: 7
	            },
	            axis: 'left',
	            xField: 'name',
	            fill: false,
	            yField: serial,
	            markerConfig: {
	                type: 'cross',
	                size: 4,
	                radius: 4,
	                'stroke-width': 0
	            }
			});
		});

		return series;
	},

	loadModel: function(model) {
		this.model = model;
		var sensorCombo = this.down("[ref='SensorCombo']");
		this.setTitle('Server ' + model.get('name'));
		this.removeAll(true);

		var fields = [];
        model.sensors().each(function(sensor) {
        	fields.push(sensor.get('serial'));
        });

		this.storeFields = fields;

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
                fields: fields,
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
                title: 'Time axes',
                label: {
                    rotate: {
                        degrees: 315
                    }
	            }
            }],
            series: this.getSeriesConfig(fields),
	        store: (function() {
	        	var store =Ext.create("Ext.data.Store", {
					fields: (function() {
						var modelFields = [];
						Ext.each(fields, function(field) {
							modelFields.push({
								name: field,
								type: "float"
							});
						});

						return modelFields;
					})().concat(['name']),
					proxy: {
						type: "ajax",
						url: "/admin/chart",
						//url: "./adminJs/app/mock/stats.php",
						reader: {
							type: "json",
							root: "items"
						},
						extraParams: {
							filter: Ext.encode({
								startDate: Ext.Date.format(new Date(Ext.Date.now() - 1000 * 60 * 120), "Y-m-d H:i:s"),
								endDate: Ext.Date.format(new Date(), "Y-m-d H:i:s"),
								sensorIds: (function() {
									var ids = [];
									model.sensors().each(function(sensor) {
										ids.push(sensor.get("sensorId"));
									});

									return ids;
								})()
							})
						}
					},
					autoLoad: true
				});

	        	return store;
	        })()
		});

		chart.store.getProxy().extraParams = {};
	},

	getCmpDockedItems: function() {
		return [{
			xtype: "toolbar",
			ref: "filter",
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
				scope: this,
				handler: this.onRenderButtonClick,
				ref: 'renderGraphicsButton'
			}]
		}]
	},

	onRenderButtonClick: function(button) {
		var toolbar = button.up("toolbar");
		var chart = button.up("window").down('TemperatureGraphic');
		var store = chart.store;
		var sensors = this.model.sensors();
		var sensorIds = [];
		var fields = this.storeFields;

		chart.series.each(function(item, index) {
			var serial = fields[index];
			var sensorId = sensors.getAt(sensors.findExact("serial", serial)).get("sensorId");

			sensorIds.push(sensorId);
		}, this);

		store.getProxy().extraParams = {};
		store.load({
			params: {
				filter: Ext.encode({
					startDate: this.getStartDate(),
					endDate: this.getEndDate(),
					sensorIds: sensorIds
				})
			},
			callback: (function(store) {
				return function(me) {
					if(store.getCount() == 0) {
						store.removeAll();
					}
				}
			})(store)
		});
	},

	getStartDate: function() {
		var toolbar = this.down("toolbar[ref='filter']");
		var startDate = toolbar.down("[als=startDateField]").getValue();
		var startTime = toolbar.down("[als=startTimeField]").getValue();
		var endDate = toolbar.down("[als=endDateField]").getValue();
		var endTime = toolbar.down("[als=endTimeField]").getValue();

		return Ext.Date.format(startDate, 'Y-m-d') + " " + Ext.Date.format(startTime, 'H:i:s');
	},

	getEndDate: function() {
		var toolbar = this.down("toolbar[ref='filter']");
		var startDate = toolbar.down("[als=startDateField]").getValue();
		var startTime = toolbar.down("[als=startTimeField]").getValue();
		var endDate = toolbar.down("[als=endDateField]").getValue();
		var endTime = toolbar.down("[als=endTimeField]").getValue();

		return Ext.Date.format(endDate, 'Y-m-d') + " " + Ext.Date.format(endTime, 'H:i:s');
	},

	getCmpItems: function() {
		return [];
	},
	getCmpButtons: function() {
		return [{
			ref: 'generateBtn',
			text: "Generate",
			scope: this,
			handler: this.generateGpaphic
		}, {
			ref: 'closeBtn',
			text: "Close",
			handler: function(button) {
				button.up("window").close();
			}
		}]
	},

	generateGpaphic: function() {
		var chart = this.down("chart");
		var fields = this.storeFields;
		var filters = [];
		var model = this.model,
			sensors = model.sensors();

		chart.series.each(function(item, index) {
			if(item.visibleInLegend()) {
				var serial = fields[index + 1];
				var sensorId = sensors.getAt(sensors.findExact("serial", serial)).get("sensorId");

				filters.push(sensorId);
			}
		}, this);

		Ext.Ajax.request({
			url: "./admin/chart/generate",
			params: {
				startDate: this.getStartDate(),
				endDate: this.getEndDate(),
				filter: Ext.encode({
					'sensorIds': filters
				})
			},
			success: function(response) {
				var result = Ext.decode(response, true);

				if(result != null) {
					window.location = result.src;
				}
			}
		});
	},

	getForm: function() {
		return this.down('form').getForm();
	}
});