Ext.define("app.modules.list.view.ListsContainer", {
	extend: "Ext.panel.Panel",
    alias: 'widget.ListsContainer',
	border: false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'ServerActionPanel',
        flex: .5
    }, {
        xtype: 'SensorActionPanel',
        flex: .5
    }]
})