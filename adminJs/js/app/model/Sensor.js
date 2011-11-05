Ext.define("MsAdmin.model.Sensor", {
	extend: "Ext.data.Model",
	fields: [
        'sensorId',
    	'name', 
    	'serverId'
    ],
    proxy: {
    	type: 'memory',
    	reader: {
    		type: "json",
    		root: 'items'
    	}
    }
});