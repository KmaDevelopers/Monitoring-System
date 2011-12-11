Ext.define("MsAdmin.model.Sensor", {
	extend: "Ext.data.Model",
    idProperty: "sensorId",
	fields: [
        'sensorId',
        'serial',
    	'serverId',
        'location', 
        'name',
        'x',
        'y'
    ],
    proxy: {
    	type: 'ajax',
        url: MsAdmin.links.sensor.url,
        actionMethods: MsAdmin.links.sensor.methods,
    	reader: {
    		type: "json",
    		root: 'items'
    	},
        writer: {
            type: 'json',
            writeAllFields: false
        }
    },
    validations: [{
        type: "presence",
        field: "name",
        message: MsAdmin.t("You should provide sensor name")
    }]
});
