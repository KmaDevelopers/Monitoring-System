Ext.define("MsAdmin.view.sensor.SensorList", {
	extend: "MsAdmin.core.widget.EditList",
    store: "Sensors",
	alias: 'widget.SensorList',
    viewConfig: {
        plugins: [{
            ptype: 'gridviewdragdrop',
            dragText: 'Place it to map',
            ddGroup: "sensor-map"
        }]
    },
	constructor: function(config) {
		this.callParent([Ext.applyIf(config || {}, {
            columns: [{
                tdCls: 'list-td',
                flex: .7,
                editable: false,
                header: "Location",
                dataIndex: "name"
            }, this.getActiveActionColumn()
            , this.getEditActionColumn()]
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