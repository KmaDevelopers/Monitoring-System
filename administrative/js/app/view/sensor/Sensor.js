Ext.define('MsAdmin.view.sensor.Sensor', {
    extend: "Ext.container.Container",
    width: 40,
    height: 40,
    cls: 'sensor',
    alias: 'widget.Sensor',
    constructor: function(config) {
        this.loadModel(config.model);
        this.applyStyles();
        this.addEvents({
            click: true
        });
        this.listeners = {
            render: this.initialize
        };

        
        this.callParent(arguments);
    },
    loadModel: function(record) {
        this.record = record;
    },
    applyStyles: function(coords) {
        this.style = {
            backgroundImage: "url('" + MsAdmin.constants.SENSOR_IMAGE_SRC + "')",
            backgroundColor:  'transparent',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 45,
            cursor: "pointer",
            position: "absolute",
            top: this.record.get('y')+ 'px',
            left: this.record.get('x') + 'px'
        };
    },
    initialize: function() {
        this.addDD();
        this.addCounter();
        this.listenEvents();
    },
    addDD: function(container) {
        var me = this;
        this.dragZone = Ext.create('Ext.dd.DDProxy', this.getEl(), 'sensor');
        this.dragZone.endDrag = (function(me) {
            me;
            return function(e) {
               var lel = this.getEl();
                var del = this.getDragEl();

                // Show the drag frame briefly so we can get its position
                del.style.visibility = "";

                this.beforeMove();
                // Hide the linked element before the move to get around a Safari
                // rendering bug.
                lel.style.visibility = "hidden";
                Ext.dd.DDM.moveToEl(lel, del);
                del.style.visibility = "hidden";
                lel.style.visibility = "";

                this.afterDrag();
                lel = Ext.fly(lel);

                me.getModel().set({
                    x: lel.getLeft(true),
                    y: lel.getTop(true)
                });
            }
        })(me);
    },
    addCounter: function() {
        var marginLeft = this.width || this.el.getWidth();
        // Ext.core.DomHelper.append(
        // this.el.dom.id, {
        //     style: "font-size:20px;color:white;font-weight:bold;margin-left:-10px" ,
        //     id: "bla",
        //     tag: "div",
        //     html: '1'
        // });
    },
    listenEvents: function() {
        this.el.on('click', function() {
            this.fireEvent('click', this);
        }, this);
    },

    getModel: function() {
        return this.model;
    }
});