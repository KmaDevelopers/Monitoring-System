Ext.define('KMA.components.InfoWindowFactory', {
    alternateClassName: 'KMA.SensorInfoFactory',
    singleton: true,
    items: [],
    get: function(sensorId) {
        var items = this.items;

        for(var i=0;i<items.length;i++) {
            if(items[i].sensorId == sensorId){
                return items[i];
            } else {
                items[i].close();
            }
        }

        var window = Ext.create('KMA.view.SensorInfoWindow', {
            title: "Sensor information",
            sensorId: sensorId
        });

        this.items.push(window);

        return window;
    }
});