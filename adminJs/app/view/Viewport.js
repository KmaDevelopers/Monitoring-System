Ext.define("MsAdmin.view.Viewport", {
    extend: "Ext.Viewport",
    layout: "border",
    autoRender: true,
    alias: "widget.Viewport",
    defaults: {
        slit: true,
        border: false
    },
    constructor: function(config) {
        this.callParent([Ext.apply(config || {}, {
            items: this.getCmpItems()
        })]);  
    },
    getCmpItems: function() {
        return[{            
            width: 300,
            title: "Temperature's Monitoring System",
            collapsible: true,
            region: "west",
            xtype: "panel",
            layout: {
                type: "fit"
            },
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
            region: 'center',
            xtype: "MapLayout"
        }]
    },
    getCenter: function() {
        return this.down('[region="center"]');
    }
});