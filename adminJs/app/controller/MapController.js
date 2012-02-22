Ext.define("MsAdmin.controller.MapController", {
	extend: "Ext.app.Controller",
	views: [
		'sensor.Sensor',
		'map.MapLayout'
	],
	refs: [{
		ref: "MapLayout",
		selector: "MapLayout"
	}],
	init: function() {
		this.control({
			'[ref="savePosButton"]': {
				click: this.onSavePositionClick
			}
		});

		MsAdmin.Event.on('server.selected', this.renderSensors, this);
		MsAdmin.Event.on('sensor.highlight', this.highlightSensor, this);
		MsAdmin.Event.on('map.sensor.add', this.addSensor, this);
		MsAdmin.Event.on('sensor.destroyed', this.removeSensor, this);
		MsAdmin.Event.on('sensor.updateVisibility', this.updateSensorVisibility, this);
	},

	onSavePositionClick: function() {
		var sensors = this.getStore('Sensors');
		sensors.sync();
	},

	updateSensorVisibility: function(model) {
		this.eachSensor(function(item) {
			if(item.getModel() == model) {
				if(model.get('active') == 1) {
					item.getEl().show()
					item.getEl().frame('red', 1);
				} else {
					if(item.getEl().isVisible()) {
						item.getEl().frame('black', 1);
						//TODO because of YABIE
						setTimeout(function() {
							item.getEl().hide();
						}, 1000);
					}
				} 
			}
		});
	},

	addSensor: function(sensor) {
		var exists = false;
		this.eachSensor(function(item){
			if(sensor == item.getModel()) {
				exists = true;
				return false;
			}
		});

		if(exists) {
			MsAdmin.Event.fire('notice', {
				msg: MsAdmin.t("Sensor is already on map")
			});

			return false;
		}

		var item = this.getMapLayout().add({
			xtype: "Sensor",
			model: sensor
		});

		if(!sensor.get('active')) {
			item.hide();
		}
	},
	removeSensor: function(model) {
		this.eachSensor(function(item) {
			if(item.getModel() == model) {
				item.getEl().frame('black', 1);
				// because of YABIE
				setTimeout(function() {
					item.destroy();
				}, 1000)
			}
		});
	},

	renderSensors: function(server) {
		Ext.each(this.getMapLayout().query('Sensor'), function(item) {
			item.destroy();
		});

		server.sensors().each(function(sensor) {
			this.addSensor(sensor);
		}, this);
	},
	/**
	 * highlight selected sensor
	 */
	highlightSensor: function(sensor) {
		this.eachSensor(function(item) {
			if(item.getModel() == sensor) {
				item.getEl().isVisible() && item.getEl().frame('red');
				return ;
			}
		});
	},
	eachSensor: function(fn) {
		Ext.each(this.getMapLayout().query('Sensor'), fn, this);
	}
});