Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext': "/administrative/js/lib/extjs/src"
    },
    disableCaching: true
});

Ext.application({
    name: "MsAdmin",
    appFolder: "/administrative/js/app",
    controllers: [
        'SensorController',
        'ServerController',
        'MapController'
    ],
    requires: [
        'MsAdmin.core.EventBus',
        'MsAdmin.LoadMask',
        'MsAdmin.links',
        'MsAdmin.constants',
        'MsAdmin.components.basic.Utils',
        'MsAdmin.components.basic.NoticeHandler',
        'MsAdmin.components.ux.Notification'
    ],
    autoCreateViewport: true,
    launch: function() {
        this.applyOverrides();
        MsAdmin.Event.fireEvent("CJ.mask.init");
    },
    applyOverrides: function() {
        Ext.data.AbstractStore.override({
          sync: function (config) {
            config = config || {};

            var defaults = { callback: Ext.emptyFn, scope: this }
            config = Ext.apply(defaults, config);

            var me        = this,
                options   = {},
                toCreate  = me.getNewRecords(),
                toUpdate  = me.getUpdatedRecords(),
                toDestroy = me.getRemovedRecords(),
                needsSync = false;

            if (toCreate.length > 0) {
              options.create = toCreate;
              needsSync = true;
            }

            if (toUpdate.length > 0) {
              options.update = toUpdate;
              needsSync = true;
            }

            if (toDestroy.length > 0) {
              options.destroy = toDestroy;
              needsSync = true;
            }

            if (needsSync && me.fireEvent('beforesync', options) !== false) {
              var batch = me.proxy.batch(options, me.getBatchListeners());
              batch.on('complete', Ext.bind(config.callback, config.scope, [this, options]), this, {single:true});
            }
          }
        });
    }
});