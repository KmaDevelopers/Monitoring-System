Ext.define('KMA.components.SensorFactory', {
    singleton : true,
    get       : function(config) {
	return Ext.create('KMA.view.Sensor', config)
    }
});