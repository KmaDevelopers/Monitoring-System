Ext.define("MsAdmin.store.Servers", {
	extend: "Ext.data.Store",
    fields: [
    	'name', 
    	'serverId'
    ],
    model: "MsAdmin.model.Server",
    autoLoad: true,
    listeners: {
    	update: function(store, model, operation, eventOptions) {
      		if(operation == Ext.data.Model.EDIT) {
          		return false;
      		} else if( operation == Ext.data.Model.COMMIT ) {
      			return true;
      		}
      	}
    }
});