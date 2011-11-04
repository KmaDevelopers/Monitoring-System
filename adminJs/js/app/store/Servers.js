Ext.define("MsAdmin.store.Servers", {
	extend: "Ext.data.Store",
    fields: [
    	'name', 
    	'serverId'
    ],
    model: "MsAdmin.model.Server",
    autoLoad: true
});