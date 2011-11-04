Ext.define("MsAdmin.view.sensor.SensorList", {
	extend: "Ext.grid.Panel",
    store: "Sensors",
	alias: 'widget.SensorList',
	constructor: function(config) {
		this.callParent([Ext.applyIf(config || {}, {
            columns: [{
                tdCls: 'list-td',
                flex: 1,
                header: "Name",
                dataIndex: "name"
            }]
		})]);

        //this.store.on('load', this.onStoreLoad, this);
        /***
        listeners: {
                beforerender: function(grid) {
                    //var serverId = Ext.StoreManager.lookup('servers').getAt(0).get('serverId');
                    //var store = Ext.StoreManager.lookup('sensors').filter('serverId', serverId); 
                },
                itemclick: function(grid, item) {
                    var serverId = item.get('serverId');
                    var store = Ext.StoreManager.lookup('sensors'); 

                    store.clearFilter();
                    store.filter('serverId', serverId);
                }  
            },
        ***/
	}
});