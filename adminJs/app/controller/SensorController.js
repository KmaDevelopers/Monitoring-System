Ext.define("MsAdmin.controller.SensorController", {
	extend: "Ext.app.Controller",
	mixins: [
		'MsAdmin.mixins.FormControllerMixin'
	],
	views: [
		'sensor.SensorList',
		'sensor.SensorViewWindow',
		'sensor.SensorListPanel'
	],
	stores: [
		'Sensors'
	],
	models: [
		'Sensor'
	],
	refs: [{
		ref: 'Viewport',
		selector: "Viewport"
	}, {
		ref: 'SensorList',
		selector: "SensorList"
	}],
	init: function() {
		this.control({
			'SensorList': {
				itemclick: this.onListItemClick,
				editiconclick: this.onEditIconClick
			},
			'SensorListPanel [ref="addButton"]': {
				click: this.onAddButtonClick
			},
			'SensorListPanel [ref="deleteButton"]': {
				click: this.onDeleteButtonClick
			},
			'SensorViewWindow[ref="create"] [ref="saveButton"]': {
				click: this.createSensor
			}
		});
	},
	onListItemClick: function(grid, model) {
		
	},

	onAddButtonClick: function() {
		!this.createWindow && (this.createWindow = this.getView('sensor.SensorViewWindow').create({
			ref: "create",
			title: "New Sensor Creation",
			renderTo: this.getViewport().getCenter().getEl() 
		}));

		MsAdmin.Event.fire('server.current', {
			callback: function(server) {
				var model = Ext.create("MsAdmin.model.Sensor", {
					serverId: server.get('id')
				});
				this.createWindow.getForm().loadRecord(model);
				this.createWindow.center();
				this.createWindow.show();
			},
			scope: this
		});
	},

	createSensor: function() {
		var form = this.createWindow.getForm();
		var model = form.getRecord();
			form.updateRecord(model);

		var errors = model.validate();

		if(errors.isValid() == false) {
			form.markInvalid(errors);
			return ;
		}

		model.save({
			success: this.onSensorSaveSuccess,
			failure: this.onSensorSaveFailure,
			scope: this
		});
	},

	onSensorSaveSuccess: function(model) {		
		var server = this.getStore('Servers').findRecord('id', model.get('serverId'));
			server.sensors().add(model);
		this.createWindow.close();

		MsAdmin.Event.fire("notice", {
			msg: "Sensor was successfully created"
		});
	},

	onSensorSaveFailure: function(model, operation) {
		var errors = operation.getError();
		var form = this.createWindow.getForm();
			this.markInvalid(form, errors);
	},

	onDeleteButtonClick: function() {
		var model = this.getSensorList().getSelectionModel().getSelection()[0];
		Ext.Msg.confirm("Delete A Sensor", 
						"Are you really want to delete sensor", 
						function() {
							this.onDeleteSensorConfirm(model);
						},this);
	},

	onDeleteSensorConfirm: function(model) {
		model.destroy({
			success: this.onSensorDestroySuccess,
			failure: this.onSensorDestroyFailure,
			scope: this
		});
	},

	onSensorDestroySuccess: function(model, operation) {
		var model = operation.request.records[0];
		model.store.remove(model);
		MsAdmin.Event.fire('notice', {
			msg: "Sensor was successfully removed"
		});
	},

	onSensorDestroyFailure: function(model, operation) {
		MsAdmin.Event.fire('notice',{
			msg: "Could't not remove server"
		});
	},

	onEditIconClick: function(model, rIdx, cIdx) {
		!this.editWindow && (this.editWindow = this.getView("sensor.SensorViewWindow").create({
			renderTo: this.getViewport().getCenter().getEl(),
			ref: "edit"
		}));

		this.editWindow.loadModel(model);
		this.editWindow.center();
		this.editWindow.show();
	},
});