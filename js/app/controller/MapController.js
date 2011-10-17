Ext.define('KMA.controller.MapController', {
    extend: "Ext.app.Controller",
    views: [
    	'Sensor', 
    	'MapContainer', 
    	'SensorInfoWindow',
        'LogWindow',
        'SensorStatisticsChart',
        'LogsList',
        'GraphicsWindow'
    ],
    refs: [{
        selector: 'map',
        ref: 'map'
    }, {
        selector: '[als="startDateField"]',
        ref: 'gStartDateField'
    }, {
        selector: '[als="endDateField"]',
        ref: 'gEndDateField'
    }, {
        selector: '[als="startTimeField"]',
        ref: 'gStartTimeField'
    }, {
        selector: '[als="endTimeField"]',
        ref: 'gEndTimeField'
    }],
    models: [
        'Statistics',
        'Sensor'
    ],
    stores: [
        'Statistics',
        'SensorCordinates'
    ],
    init: function() {
        this.control({
            '[ref="refreshBtn"]': {
                click: this.doRefresh
            },
            'map sensor': {
                render: this.onSensorRendered,
                click: this.onSensorClick
            },
            '[ref="viewLogsButton"]' : {
                click: this.viewLogsClicked
            },
            '[ref="viewGraphicsButton"]' : {
                click: this.onViewGrapicsButtonClicked
            },
            '[ref="renderGraphicsButton"]' : {
                click: this.onRenderGraphicsButtonClicked
            }
            // '[ref="filterField"]' : {
            //     change: this.onFilterFieldChanged
            // }
        });

        this.getStore('SensorCordinates').on('load', this.addSensors, this);
        this.startAutomaticUpdate();
    },
    viewLogsClicked: function(button) {
        var wnd = button.findParentByType('SensorInfoWindow');
        var sensorId = wnd.sensorId;

        var store = Ext.StoreMgr.lookup('statistics-' + sensorId);

        if(store) {
            store.load({
                addRecords: false
            });
        } else {
            store = Ext.create('KMA.store.Statistics', {
                storeId: 'statistics-' + sensorId
            });

            store.proxy.url = '/statistics/'+sensorId;
            store.load();
        }

        Ext.create('KMA.view.LogWindow', {
            store: store,
            autoShow: true
        }).center();
    },

    onViewGrapicsButtonClicked: function(button) {
        var window = button.findParentByType("SensorInfoWindow");
        var sensorId = window.sensorId;

        var store = Ext.StoreMgr.lookup('statistics-graph' + sensorId);

        if(store == undefined) {
            store = Ext.create('KMA.store.Statistics', {
               storeId: 'statistics-graph-' + sensorId 
            });

            store.proxy.url = '/statistics/' + sensorId;
            store.load();
        } else {
            store.load({
                addRecords: false
            });
        }

        Ext.create('KMA.view.GraphicsWindow', {
            store: store,
            sensorId: sensorId,
            autoShow: true,
            id: 'graphics-' + sensorId 
        }).center();
    },

    startAutomaticUpdate: function() {
        Ext.TaskManager.start({
            run: function() {
                this.getStore('SensorCordinates').load();
            },
            interval: KMA.constants.INTERVAL, //1 second
            scope: this
        });
    },
    addSensors: function() {
        if(this.layoutCreated) {
            return false;
        }

        this.getStore('SensorCordinates').each(function(item) {
            this.getMap().add({
                xtype: "sensor",
                model: item,
                coords: [item.get('x'), item.get('y')]
            });
        }, this);

        this.layoutCreated = true;
    },
    doRefresh: function() {
        Ext.each(this.getMap().query('sensor'), function(item) {
            item.destroy();
        });
        
        this.layoutCreated = false;
        this.addSensors();
    },
    onSensorRendered: function(sensor) {
        // sensor.qtip = Ext.create('Ext.tip.ToolTip', {
        //     target: sensor.el.dom,
        //     bodyStyle: 'background-color:white',
        //     html: this.getTooltip(sensor)
        // });
    },
    getTooltip: function(sensor) {
        return Ext.create("Ext.XTemplate", 
            '<div style="background-color:white;font-size:14px">', 
                '<div><span style="font-weight:bold">Serial: {name}</span></div>', 
                '<div><span style="font-weight:bold">IP-address: {ip}</span></div>',
                '<div><span style="font-weight:bold">Temperature: {temperature}</span></div>', 
            '</div>').apply(sensor.record.data);
    },
    onSensorClick: function(sensor) {
        var sensorId = sensor.record.get('sensorId');
        KMA.components.InfoWindowFactory.get(sensorId).showInMap();
    },
    onRenderGraphicsButtonClicked: function(button) {
        var parentWindow = button.findParentByType('GraphicsWindow');
        var store = parentWindow.store;
        var startDate = this.getGStartDateField().getRawValue();
        var endDate = this.getGEndDateField().getRawValue();

        var startTime = this.getGStartTimeField().getRawValue();
        var endTime = this.getGStartTimeField().getRawValue();

        var request = {
            startDate: startDate + " " + startTime + ':00',
            endDate: endDate + " " + endTime + ':00'
        };
        
        console.log(request);
        store.proxy.extraParams = request;
        store.load({
            addRecords: false
        });
    },
    onFilterFieldChanged: function(field) {
        var startDate = this.getGStartDateField().getValue();
        var endDate = this.getGEndDateField().getValue();

        var startTime = this.getGStartTimeField().getValue();
        var endTime = this.getGStartTimeField().getValue();
    }
});
