Ext.define("MsAdmin.components.basic.NoticeHandler", {
	singleton: true,
	constructor: function() {
		MsAdmin.Event.on('notice', this.showNotice, this);
	},
	showNotice: function(config) {
		config = Ext.applyIf(config || {}, {
			msg: ""
		});

		this.getWindow(config).show();
	},
	getWindow: function(config) {
		return Ext.create("MsAdmin.components.ux.Notification", {
			html: config.msg
		});
	}
});