Ext.define("MsAdmin.controller.ServerController", {
	extend: "Ext.app.Controller",
	mixins: [
		'MsAdmin.mixins.FormControllerMixin'
	],
	views: [
		'server.ServerList',
		'server.ServerListPanel',
		'server.ServerViewWindow'
	],
	stores: [
		'Servers',
		'Sensors'
	],
	models: [
		'Server'
	],
	refs: [{
		ref: "ServerList",
		selector: "ServerList"
	}, {
		ref: "SensorList",
		selector: "SensorList"
	}, {
		ref: 'Viewport',
		selector: "Viewport"
	}, {
		ref: 'ServerEditWindow',
		selector: 'ServerViewWindow[ref="edit"]'
	}, {
		ref: 'ServerCreateWindow',
		selector: 'ServerViewWindow[ref="create"]'
	}, {
		ref: 'ServerEditForm',
		selector: 'ServerViewWindow[ref="edit"] form'
	}, {
		ref: 'ServerCreateForm',
		selector: 'ServerViewWindow[ref="create"] form'
	}],
	editWindow: null,
	init: function() {
		this.control({
			'ServerList': {
				itemclick: this.onListItemClick,
				editiconclick: this.onEditIconClick
			}, 
			'ServerListPanel [ref="addBtn"]': {
				click: this.onAddServerClick
			},
			'ServerListPanel [ref="delBtn"]': {
				click: this.onDeleteServerClick
			},
			
			'ServerViewWindow[ref="edit"] [ref="saveBtn"]': {
				click: this.onUpdateServerInfoClick
			},
			'ServerViewWindow[ref="edit"] [ref="closeBtn"]': {
				click: function(){
					this.getServerEditWindow().close()
				}
			},
			'ServerViewWindow[ref="create"] [ref="saveBtn"]': {
				click: this.onCreateServerClick
			},
			'ServerViewWindow[ref="create"] [ref="closeBtn"]': {
				click: function(){
					this.getServerCreateWindow().close()
				}
			}
		});

		this.getStore('Servers').on('load', this.onDataLoad, this);
		MsAdmin.Event.on('server.current', this.getCurrentServer, this);
	},

	getCurrentServer: function(config) {
		var model = this.getServerList().getSelectionModel().getSelection()[0];
		config.callback.call(config.scope || window, model);
	},

	onListItemClick: function(grid, item) {
		this.showSensors(item);
	},
	showSensors: function(server) {
		var newStore = server.sensors();
		var sensorList = this.getSensorList();
			sensorList.reconfigure(newStore, sensorList.initialConfig.columns);	

		MsAdmin.Event.fire('server.selected', server);
	},
	onDataLoad: function(store) {
		if(store.getCount() == 0) {
			return ;
		}

		var serverList = this.getServerList();

		serverList.getSelectionModel().select(0);
		this.showSensors(store.getAt(0));
	},
	onEditIconClick: function(model, rIdx, cIdx) {
		if(this.editWindow == undefined) {
			this.editWindow = this.getView("server.ServerViewWindow").create({
				ref: "edit"
			});
		}
		
		this.editWindow.loadModel(model);
		this.editWindow.center();
		this.editWindow.show();
	},
	onUpdateServerInfoClick: function() {	
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
			success: this.onServerSaveSuccess,
			failure: this.onServerSaveFailure
		});
	},
	onServerSaveSuccess: function(model) {
		//this.getServerEditForm().getForm().loadRecord(model);
		this.getServerEditWindow().close();

		MsAdmin.Event.fire("notice", {
			msg: "Server information was successfully updated"
		});
	},
	onServerSaveFailure: function(record, operation) {
		var errors = operation.getError();
		var form = this.editWindow.getForm();
		this.markInvalid(form, errors);
	},
	onAddServerClick: function() {
		!this.createWindow && (this.createWindow = this.getView("server.ServerViewWindow").create({
			//renderTo: this.getViewport().getCenter().getEl(),
			ref: "create",
			title: "New Server Creation"
		}));

		this.getServerCreateForm().getForm().loadRecord(Ext.create("MsAdmin.model.Server"));
		this.createWindow.center();
		this.createWindow.show();
	},
	onDeleteServerClick: function() {
		var item = this.getServerList().getSelectionModel().getSelection()[0];
		Ext.Msg.confirm("Delete A Server", 
						"Are you really want to delete server " + item.get('name'), 
						function() {
							this.onDeleteServerConfirm(item);
						},this);
	},
	onDeleteServerConfirm: function(model) {
		var store = this.getStore('Servers');
		store.remove(model);
		
		store.destroy({
			callback: this.onModelDestroySuccess,
			failure: function() {
				this.eventbus.fireEvent("global.Error", {
					msg: "ERROR"
				});
			},
			scope: this
		});
	},
	onModelDestroySuccess: function(model, operation) {
		MsAdmin.Event.fire("notice", {
			msg: "Server " + operation.request.records[0].get('name') + " information was successfully updated"
		});
	},
	onCreateServerClick: function() {
		var form = this.getServerCreateForm().getForm();
		var model = form.getRecord();
		form.updateRecord(model);

		var erorrs = model.validate();

		if(erorrs.isValid() == false) {
			form.markInvalid(erorrs);
			return ;
		}

		model.save({
			success: this.onCreateServerSuccess,
			failure: this.onCreateServerFailure,
			scope: this
		}); 
	},
	onCreateServerSuccess: function(model) {
		this.getStore('Servers').add(model);
		this.getServerCreateWindow().close();

		MsAdmin.Event.fire("notice", {
			msg: "Server was successfully created"
		});
	},
	onCreateServerFailure: function(record, operation) {
		var errors = operation.getError();
		var form = this.getServerCreateForm().getForm();
			this.markInvalid(form, errors);
	}
});