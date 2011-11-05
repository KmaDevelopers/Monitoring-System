Ext.define("MsAdmin.view.Viewport", {
    extend: "Ext.Viewport",
    layout: "border",
    alias: "widget.Viewport",
    defaults: {
        width: 300,
        height: 200,
        slit: true
    },
    constructor: function(config) {
        this.callParent([Ext.apply(config || {}, {
            items: this.getItems()
        })]);  
    },
    getItems: function() {
        return[{            
            region: "west",
            xtype: "panel",
            layout: {
                type: "fit"
            },
            border: false,
            items: [{
                border: false,
                xtype: 'panel',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'ServerListPanel',
                    flex: .5
                }, {
                    xtype: 'SensorListPanel',
                    flex: .5
                }]
            }]
        }, {
            border: false,
            region: 'center'
        }]
    },
    getCenter: function() {
        return this.down('[region="center"]');
    }
});

/******
, {
                    flex: .5,
                    xtype: "panel",
                    title: "Sensors",
                    dockedItems: [{
                        xtype: "toolbar",
                        dock: "bottom",
                        items: [{
                            text: "Add"
                        }, {
                            text: "Delete"
                        }]
                    }],
                    layout: 'fit',
                    items: [{
                        xtype: "gridpanel",
                        store: Ext.create("Ext.data.Store", {
                            fields: ['name', 'serverId'],
                            storeId: "sensors",
                            proxy: {
                                type: "memory",
                                reader: {
                                    type: "json",
                                    root: 'items'
                                }
                            },
                            autoLoad: true,
                            data: {
                                items: [{
                                    serverId: 1,
                                    name: "Sensor 1"
                                },{
                                    serverId: 1,
                                    name: "Sensor 2"
                                },{
                                    serverId: 1,
                                    name: "Sensor 3"
                                },{
                                    serverId: 1,
                                    name: "Sensor 4"
                                },{
                                    serverId: 2,
                                    name: "Sensor 5"
                                },{
                                    serverId: 2,
                                    name: "Sensor 6"
                                },{
                                    serverId: 2,
                                    name: "Sensor 7"
                                },{
                                    serverId: 2,
                                    name: "Sensor 8"
                                },]
                            }
                        }),
                        columns: [{
                            flex: 1,
                            header: "Name",
                            dataIndex: "name"
                        }]
                    }]
                }]
            }

*****/