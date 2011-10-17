Ext.define('KMA.model.Sensor', {
    extend: 'Ext.data.Model',
    idProperty: 'sensorId',
    fields: [{
        name: 'sensorId',
        type: 'int'
    },{
        name: "name",
        type: 'string'
    }, {
        name: "x",
        type: 'int'
    }, {
        name: "y",
        type: 'int'
    }, {
        name: 'temperature',
        type: 'float'
    }, {
        name: "ip",
        type: "string"
    }, {
        name: 'serial',
        type: 'string'
    }],
    proxy: {
        type: "rest",
        url: "/sensor",
        reader: {
            type: 'json',
            root: 'items'
        }
    }
});