Ext.define('KMA.model.Statistics', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'temperature',
		type: 'float'
	}, {
		name: 'date',
		type: 'string'
	}],
	proxy: {
		type: "rest",
		simpleSortMode: true,
		url: "/statistics",
		reader: {
			type: 'json',
			root: 'items'
		}
	}
});