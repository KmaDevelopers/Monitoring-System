Ext.define("app.modules.list.controller.ListController", {
    extend: "Ext.app.Application",
    stores: [
    	'Sensors',
    	'Servers'
    ],
    models: [
    	'Sensor',
    	'Server'
    ],
    controllers: [
        ''
    ],
    views: [
        // list of components
    	'app.components.actionList.view.List',
        'app.components.actionList.view.Panel',

    	'app.modules.list.view.ServerActionList',
    	'app.modules.list.view.SensorActionList',

        'app.modules.list.view.ServerActionPanel',
        'app.modules.list.view.SensorActionPanel',

    ],
    init: function() {
		
    }
});