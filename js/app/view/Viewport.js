Ext.define("KMA.view.Viewport",{
    extend: "Ext.Viewport",
    layout: "border",
    defaults: {
        width: 300,
        height: 200,
        split: true
    },
    items: [{
        region: "center",
        xtype: "map"
    }]
});