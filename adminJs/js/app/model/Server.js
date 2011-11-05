Ext.define("MsAdmin.model.Server", {
	extend: "Ext.data.Model",
	fields: [
		'serverId',
		'name'
	],
	proxy: {
        type: "ajax",
        url: MsAdmin.links.server.list.url,
        reader: {
            type: "json",
            root: 'items'
        }
    },
    associations: [{
    	type: "hasMany",
    	model: "MsAdmin.model.Sensor",
    	name: 'sensors'
    }]

});