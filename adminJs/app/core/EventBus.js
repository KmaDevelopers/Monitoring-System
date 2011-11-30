Ext.define("MsAdmin.core.EventBus", {
	singleton: true,
	alternateClassName: "MsAdmin.Event",
	extend: "Ext.util.Observable",
	fire: function() {
		this.fireEvent.apply(this, arguments);
	}
});