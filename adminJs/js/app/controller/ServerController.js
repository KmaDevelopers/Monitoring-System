Ext.define("MsAdmin.controller.ServerController", {
	extend: "Ext.app.Controller",
	views: [
		'Viewport',
		'server.ServerList',
		'server.ServerListPanel',
		'server.ServerEditWindow'
	],
	stores: [
		'Servers',
		'Sensors'
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
		selector: 'ServerEditWindow'
	}],
	editWindow: null,
	init: function() {
		this.control({
			'ServerList': {
				itemclick: this.onListItemClick,
				editiconclick: this.onEditIconClick
			}, 
			'ServerListPanel [ref="addBtn"]': {
				
			},
			'ServerListPanel [ref="delBtn"]': {
				
			},
			'ServerEditWindow [ref="saveBtn"]': {
				click: this.onUpdateServerInfoClick
			},
			'ServerEditWindow [ref="closeBtn"]': {
				click: function(){this.getServerEditWindow().close()}
			}
		});

		this.getStore('Servers').on('load', this.onDataLoad, this);
	},
	onListItemClick: function(grid, item) {
		this.showSensors(item.sensors());
	},
	showSensors: function(newStore) {
		var sensorList = this.getSensorList();
		sensorList.reconfigure(newStore, sensorList.initialConfig.columns);	
	},
	onDataLoad: function(store) {
		if(store.getCount() == 0) {
			return ;
		}

		var serverList = this.getServerList();

		serverList.getSelectionModel().select(0);
		this.showSensors(store.getAt(0).sensors());
	},
	onEditIconClick: function(item, rIdx, cIdx) {
		!this.editWindow && (this.editWindow = this.getView("server.ServerEditWindow").create({
			renderTo: this.getViewport().getCenter().getEl()
		}));

		this.editWindow.renderServerInfo(item);
		this.editWindow.center();
		this.editWindow.show();
	},
	onUpdateServerInfoClick: function() {		
		this.getServerEditWindow().down('form').getForm().isValid();
	}
});