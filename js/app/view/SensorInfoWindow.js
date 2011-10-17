Ext.define('KMA.view.SensorInfoWindow', {
    extend: "Ext.tip.ToolTip",
    width: 270,
    modal: false,
    height: 180,
    resizable: false,
    bodyStyle: 'background-color:white',
    closeAction: 'hide',
    alias: 'widget.SensorInfoWindow',
    bodyPadding: 20,
    dismissDelay: 10000,
    autoHide: true,
    listeners: {
        show: function(infoWindow) {
            this.updateView();
        }
    },
    showInMap: function() {
        var mapSize = Ext.getBody().getSize();
        
        //if(KMA.SensorInfoFactory.items.length == 1 ){
            this.showAt([mapSize.width-10, 10]);
        // } else {
        //     var items = KMA.SensorInfoFactory.items;
        //     var lastItem = items[items.length-1];

        //     this.showAt(lastItem.getXY());
        // }
    },
    updateView: function() {
        var model = Ext.StoreMgr.lookup('SensorCordinates').findRecord('sensorId', this.sensorId);
        if(this.items.length == 0) {
            console.log('we have troubles');
            return ;
        } 

        this.child('[ref="ip"]').setValue(model.get('ip'));
        this.child('[ref="serial"]').setValue(model.get('serial'));
        this.child('[ref="temperature"]').setValue(model.get('temperature'));
        this.child('[ref="lastUpdated"]').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
    },
    // private
    onDocMouseDown: function(e) {
        return ;
    },
    constructor: function(config) {
        this.sensorId = config.sensorId;
        this.items = [{
            xtype: 'displayfield',
            ref: 'ip',
            fieldLabel: "IP"
        }, {
            xtype: 'displayfield',
            ref: 'serial',
            fieldLabel: "SERIAL"
        }, {
            xtype: 'displayfield',
            ref: 'temperature',
            fieldLabel: "Temperature"
        }, {
            xtype: 'displayfield',
            ref: 'lastUpdated',
            width: 400,
            fieldLabel: "Last updated in"
        }, {
            xtype: 'fieldcontainer',
            style: 'padding:10px',
            items: [{
                xtype: "button",
                ref: 'viewGraphicsButton',
                text: "View Graphics"
            }, {
                xtype: "button",
                style: 'margin-left:20px',
                ref: 'viewLogsButton',
                text: "View Logs"
            }]
        }];

        this.callParent([config]);
        var store = Ext.StoreManager.lookup('SensorCordinates');
            store.on('datachanged', this.updateView, this);
    }
});