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
	}, {
		ref: "ServerEditForm",
		selector: "SensorViewWindow[ref='edit'] form"
	}],
	init: function() {
		this.control({
			'SensorList': {
				itemclick: this.onListItemClick,
				activeiconclick: this.onActiveIconClick,
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
			},
			'SensorViewWindow[ref="edit"] [ref="saveButton"]': {
				click: this.editSensor
			}
		});
	},
	onListItemClick: function(grid, model) {
		MsAdmin.Event.fire("sensor.selected", model);
	},

	onAddButtonClick: function() {
		!this.createWindow && (this.createWindow = this.getView('sensor.SensorViewWindow').create({
			ref: "create",
			title: "New Sensor Creation"
		}));

		MsAdmin.Event.fire('server.current', {
			callback: function(server) {
				var model = Ext.create("MsAdmin.model.Sensor", {
					serverId: server.get('serverId')
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

	editSensor: function() {
		var form, model, errors;

		form = this.getServerEditForm().getForm();
		model = form.getRecord();

		form.updateRecord(model);
		errors = model.validate();

		if(errors.isValid() == false) {
			form.markInvalid(errors);
			return ;
		} 
		
		model.dirty && model.save({
			scope: this,
			success: this.onSensorSaveSuccess,
			failure: this.onSensorSaveFailure
		});
	},

	onSensorSaveSuccess: function(model) {		
		var server = this.getStore('Servers').findRecord('serverId', model.get('serverId'));
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
		MsAdmin.Event.fire('sensor.destroyed', model);
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
			//renderTo: this.getViewport().getCenter().getEl(),
			ref: "edit"
		}));

		this.editWindow.loadModel(model);
		this.editWindow.center();
		this.editWindow.show();
	},

	onActiveIconClick: function(model, rIdx, cIdx) {
		Ext.Msg.alert('works');
	}
});