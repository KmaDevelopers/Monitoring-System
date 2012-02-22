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
		ref: "SensorEditForm",
		selector: "SensorViewWindow[ref='edit'] form"
	}, {
		ref: "SensorEditWindow",
		selector: "SensorViewWindow[ref='edit']"
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

		MsAdmin.Event.on('server.selected', this.onServerSelected, this);
	},
	onServerSelected: function(server) {
		// server.sensors().un('update', this.onSensorUpdated);
		// server.sensors().on('update', this.onSensorUpdated);
	},
	onSensorUpdated: function(store, model, operation, eventOptions) {
  		if(operation == Ext.data.Model.EDIT) {
      		return false;
  		} else if( operation == Ext.data.Model.COMMIT ) {
  			return true;
  		}
	},
	/**
	 * fires when user clicks on sensor
	 */
	onListItemClick: function(grid, model, a, b) {
		var isIconClicked = Ext.EventObject.getTarget('.edit-link');

		if(isIconClicked) {
			return false;
		}
		
		MsAdmin.Event.fire("sensor.highlight", model);
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

	getSensorUpdateConfig: function() {
		return {
			success: this.onSensorEditSuccess,
			failure: this.onSensorEditFailure,
			scope: this
		}
	},

	getSensorCreateConfig: function() {
		return {
			success: this.onSensorSaveSuccess,
			failure: this.onSensorSaveFailure,
			scope: this
		}
	},

	// onCellEdited: function(plugin, e) {
	// 	e.record.dirty && e.record.save(this.getSensorUpdateConfig());
	// },

	createSensor: function() {
		var form = this.createWindow.getForm();
		var model = form.getRecord();
			form.updateRecord(model);

		var errors = model.validate();

		if(errors.isValid() == false) {
			form.markInvalid(errors);
			return ;
		}

		model.save(this.getSensorCreateConfig());
	},

	editSensor: function() {
		var form, model, errors;

		form = this.getSensorEditForm().getForm();
		model = form.getRecord();

		form.updateRecord(model);
		errors = model.validate();

		if(errors.isValid() == false) {
			form.markInvalid(errors);
			return ;
		} 
		
		if(model.dirty) {
			model.save(this.getSensorUpdateConfig());	
		} else {
			this.getSensorEditWindow().close();
		}
	},

	onSensorEditSuccess: function(tempModel, operation) {
		var model = operation.request.records[0];

		model.set(tempModel.data);
		model.commit(true);
		
		if(this.editWindow) {
			this.editWindow.close();
		}

		MsAdmin.Event.fire("sensor.updateVisibility", model);
		MsAdmin.Event.fire("notice", {
			msg: "Sensor was successfully updated"
		});
	},

	onSensorEditFailure: function(model, operation) {
		var errors = operation.getError();

		if(this.editWindow) {
			this.markInvalid(this.editWindow.getForm(), errors);
		} else {
			MsAdmin.Event.fire("notice", {
				msg: errors || "Could't update sensor, errors occured"
			});
		}
	},

	onSensorSaveSuccess: function(tempRecord, operation) {		
		var model = operation.records[0];
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
	/**
	 * fires when sensor was succesfully destroyed
	 * removes model from Store
	 * @param {MsAdmin.model.Sensor} tempModel
	 * @params {Ext.data.Operation} operation
	 * @returns {undefined}
	 */
	onSensorDestroySuccess: function(tempModel, operation) {
		var model = operation.request.records[0],
			store = model.store;
		MsAdmin.Event.fire('sensor.destroyed', model);
		store.remove(model);
		MsAdmin.Event.fire('notice', {
			msg: "Sensor was successfully removed"
		});
	},
	/**
	 * fires when errors occured in destroy-procedure
	 * @returns {undefined}
	 */
	onSensorDestroyFailure: function(tempRecord, operation) {
		MsAdmin.Event.fire('notice', {
			msg: MsAdmin.constants.AJAX_ERROR_MSG
		});
	},
	/**
	 * shows sensor's edit-window
	 * @param {MsAdmin.model.Sensor} model
	 * @param {Integer} rIdx row-index
	 * @param {Integer} cIdx column-index
	 * @returns {undefined}
	 */
	onEditIconClick: function(model, rIdx, cIdx) {
		!this.editWindow && (this.editWindow = this.getView("sensor.SensorViewWindow").create({
			//renderTo: this.getViewport().getCenter().getEl(),
			ref: "edit"
		}));

		this.editWindow.loadModel(model);
		this.editWindow.center();
		this.editWindow.show();
	},
	/**
	 * fires when user clicks on active-icon
	 * changes active-state and saves model
	 * @param {MsAdmin.model.Sensor} model
	 * @param {Integer} rIdx row-index
	 * @param {Integer} cIdx column-index
	 * @retuns {undefined}
	 */
	onActiveIconClick: function(model, rIdx, cIdx) {
		model.set('active', (!model.get('active')) - 0);
		model.store.sync({
			callback: this.onSensorEditSuccess,
			scope: this
		});
		// model.save({
		// 	success: this.onSensorEditSuccess,
		// 	failure: this.onSensorEditFailure,
		// 	scope: this
		// });
	}
});