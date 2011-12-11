Ext.define("MsAdmin.model.Server", {
	extend: "Ext.data.Model",
    idProperty: "serverId",
	fields: [{
        name: 'serverId',
        type: 'int'
    }, {
	   name: 'name'
    }, {
       name: 'path' 
    }, {
        name: 'ip'
    }, {
        name: 'active',
        defaultValue: true,
        type: "bool"
    }],
	proxy: {
        type: "ajax",
        url: MsAdmin.links.server.url,
        reader: {
            messageProperty: 'errors',
            type: "json",
            root: 'items'
        },
        writer: {
            type: 'json',
            writeAllFields: false
        },
        actionMethods: MsAdmin.links.server.methods
    },
    associations: [{
    	type: "hasMany",
    	model: "MsAdmin.model.Sensor",
    	name: 'sensors'
    }],
    validations: [{
        type: 'length',
        message: MsAdmin.t("Server's name must be longer then 2 symbols"),
        field: 'name',
        min: 3
    }, {
        type: "format",
        message: MsAdmin.t("ip address is not valid"),
        field: "ip",
        matcher: /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/
    }]
});