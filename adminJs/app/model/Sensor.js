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
        type: 'format',
        field: "serial",
        matcher: /^[0-9]{1,20}$/,
        message: MsAdmin.t("Serial must be a number")
    }, {
        type: "presence",
        field: "name",
        message: MsAdmin.t("You should provide sensor name")
    }]
});