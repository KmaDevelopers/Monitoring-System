Ext.define('KMA.view.LogWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.LogWindow',
	width: 800,
	maximizable: true,
	layout:'fit',
	height: 600,
	closeAction: 'destroy',
	constructor: function(config) {
		Ext.applyIf(config, {
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items: ['->',{
					xtype: 'button',
					text: 'Refresh',
					handler: function(){
						config.store.load();
					}
				}]
			}],
			items: [{
				xtype: "LogsList",
				forceFit: true,
				store: config.store
			}]
		});
		this.callParent([config]);
	}
});