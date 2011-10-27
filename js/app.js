Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true
});

Ext.application({
    name: "KMA",
    appFolder: "./js/app",
    controllers: ['MapController'],
    requires: [
        'Ext.window.MessageBox', 
        'KMA.components.InfoWindowFactory', 
        'KMA.components.SensorFactory', 
        'KMA.constants', 
        'Ext.QuickTips'
    ],
    autoCreateViewport: true,
    launch: function() {
        Ext.QuickTips.init();
    }
})