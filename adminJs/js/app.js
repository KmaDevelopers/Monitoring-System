Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext': "./adminJs/js/lib/extjs/src"  
    },
    disableCaching: true
});

Ext.application({
    name: "MsAdmin",
    appFolder: "./adminJs/js/app",
    controllers: [
        'SensorController',
        'ServerController'
    ],
    requires: [
        'MsAdmin.links',
        'MsAdmin.constants'
    ],
    autoCreateViewport: true
})