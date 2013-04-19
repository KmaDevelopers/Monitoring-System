Ext.define("MsAdmin.model.Sensor", {
	extend: "Ext.data.Model",
    idProperty: "sensorId",
	fields: [
        'sensorId',
        'serial', {
            name: 'serverId',
            type: "int"
        },
        'position', 
        'name',
        {
            name: 'x',
            type: "float",
            defaultValue: 0
        }, {
            name: 'y',
            type: "float",
            defaultValue: 0
        }, {
            name: 'active',
            defaultValue: 1,
            type: 'int'
        }
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
        },
        afterRequest: function(response) {
            if(response.action == 'update') {
                
            }
        }
    },
    validations: [{
        type: "presence",
        field: "name",
        message: MsAdmin.t("You should provide sensor name")
    }]
});
