Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext': "./adminJs/lib/extjs/src"
    },
    disableCaching: true
});

Ext.application({
    name: "MsAdmin",
    appFolder: "/adminJs/app",
    controllers: [
        'SensorController',
        'ServerController'
    ],
    requires: [
        'MsAdmin.core.EventBus',
        'MsAdmin.links',
        'MsAdmin.constants',
        'MsAdmin.components.basic.Utils',
        'MsAdmin.components.basic.NoticeHandler',
        'MsAdmin.components.ux.Notification'
    ],
    autoCreateViewport: true
})