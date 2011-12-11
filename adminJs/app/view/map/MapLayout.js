Ext.define("MsAdmin.view.map.MapLayout", {
	extend: "Ext.panel.Panel",
	alias: "widget.MapLayout",
	dockedItems: [{
        dock: 'bottom',
        xtype: 'toolbar',
        items: ['->',
        {
            xtype: "button",
            ref: "savePosButton",
            text: "Save position"
        }, {
            xtype: "button",
            ref: "refreshBtn",
            text: "Refresh"
        }, {
            xtype: "button",
            text: "Show Form",
            handler: function() {
                var w = Ext.create('Ext.Window', {
                    title: "Just window title",
                    width: 500,
                    height: 500,
                    minimizable: true,
                    maximizable: true,
                    items: {
                        xtype: 'tabpanel',
                        items: [{
                            title: 'title1',
                            html: "Some text goes here"
                        }, {
                            title: 'title2',
                            html: "Some text goes here"
                        }, {
                            title: 'title3',
                            html: "Some text goes here"
                        }]
                    },
                    buttons: [{
                        text: "Save"
                    }, {
                        text: "Close"
                    }]
                });

                w.show();
            }
        }]
    }],
    bodyStyle: {
	    "overflow": "auto",
        "position": "relative"
    },
    bodyCls: 'map-body',
    constructor: function(config) {
    	this.callParent([
    		Ext.applyIf(config || {}, {
    			layout: 'auto',
    			items: {
    				width: 1300,
    				height: 850,
	            	xtype: 'box',
	            	ref: "map",
	            	autoEl: {
	                	tag: 'img',
	                	src: MsAdmin.constants.BG_IMAGE_SRC,
	                	style: {
	                    	width: "1300px",
	                    	height: "850px"
	                	}
	            	}
	            },
	            listeners: {
	            	render: this.attachDD
	            }
        	})
	    ]);
    },
    attachDD: function(panel) {
    	this.dd = Ext.create("Ext.dd.DropZone", this.getEl() , {
    		view: this,
    		ddGroup: "sensor-map",
    		getTargetFromEvent: function(e) {
    			return e.getTarget('.map-body');
    		},
    		onNodeOver: function(node, dropZone, e, data) {
    			dropZone.position = this.getPositon(e);
    			return Ext.dd.DropZone.prototype.dropAllowed;
    		},
    		getPositon: function(e) {    			
    			var x = e.getPageX();
    			var y = e.getPageY();

    			var leftOffset = this.view.getEl().getLeft();
    			return [x-leftOffset, y];
    		},
    		onNodeDrop: function(node, dropZone, e, data) {
    			var record = data.records[0];
    				record.set('x' ,dropZone.position[0]);
    				record.set('y', dropZone.position[1]);

    			MsAdmin.Event.fire('map.sensor.add', record);
    		}
    	});
    }
});
