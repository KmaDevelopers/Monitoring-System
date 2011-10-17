Ext.define('KMA.view.LogsList', {
	extend: "Ext.grid.Panel",
	alias: 'widget.LogsList',
	columns: [{
		header: "Date",
		align: 'center',
		dataIndex: "date"
	}, {
		header: "Temperature",
		align: 'center',
		dataIndex: 'temperature'
	}],
	viewConfig: {
		emptyText: '<div class="grid-no-data"></div>'
	},
	constructor: function(config) {
		this.listeners = {
			render: function() {
				this.view.refresh();
			}
		};
		
		this.initDockedItems(config.store);
		this.task = {
			run: function() {
				this.store.load({
					addRecords: false
				});
			},
			interval: KMA.constants.INTERVAL,
			scope: this
		};

		this.callParent(arguments);
		//this.startTimer();
	},
	initDockedItems: function(store) {
		this.dockedItems =[{
			xtype: 'pagingtoolbar',
			store: store,
			dock: 'bottom',
			displayInfo: true
		}];
	},
	startTimer: function() {
		Ext.TaskManager.start(this.task);
	},
	listeners: {
		destroy: function(me) {
			Ext.TaskManager.stop(me.task);
		}
	}
});