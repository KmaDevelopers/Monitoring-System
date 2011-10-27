Ext.define('KMA.view.Sensor', {
    extend: "Ext.container.Container",
    width: 40,
    height: 40,
    cls: 'sensor',
    alias: 'widget.sensor',
    constructor: function(config) {
        this.applyStyles(config.coords);
        this.addEvents({
            click: true
        });
        this.listeners = {
            render: this.initialize
        };

        this.initRecord(config.model);
        this.callParent(arguments);
    },
    initRecord: function(record) {
        this.record = record;
    },
    applyStyles: function(coords) {
        this.style = {
            backgroundImage: "url('" + KMA.constants.SENSOR_IMAGE_SRC + "')",
            backgroundColor:  'transparent',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 45,
            cursor: "pointer",
            position: "absolute",
            top: coords[1] + 'px',
            left: coords[0] + 'px'
        };
    },
    initialize: function() {
        this.addDD();
        this.addCounter();
        this.listenEvents();
    },
    addDD: function(container) {
        this.dragZone = Ext.create('Ext.dd.DDProxy', this.getEl(), 'sensor');
    },
    addCounter: function() {
        var marginLeft = this.width || this.el.getWidth();
        Ext.core.DomHelper.append(
        this.el.dom.id, {
            style: "font-size:20px;color:white;font-weight:bold;margin-left:-10px" ,
            id: "bla",
            tag: "div",
            html: '1'
        });
    },
    listenEvents: function() {
        this.el.on('click', function() {
            this.fireEvent('click', this);
        }, this);
    }
});