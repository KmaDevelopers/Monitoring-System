Ext.define('KMA.view.MapContainer', {
    extend: "Ext.panel.Panel",
    style: "overflow:auto",
    bodyStyle: "background-size:70%;overflow:auto;position:relative;background:url('" + KMA.constants.IMAGEHOST + "/images/map.gif') no-repeat white",
    alias: 'widget.map',
    height: 600,
    width: 960,
    dockedItems: [{
        dock: 'bottom',
        xtype: 'toolbar',
        items: ['->',
        {
            xtype: "button",
            text: "Save position"
        }, {
            xtype: "button",
            ref: "refreshBtn",
            text: "Refresh"
        }]
    }]
});