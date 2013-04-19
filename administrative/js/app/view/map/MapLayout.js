Ext.define("MsAdmin.view.map.MapLayout", {
	extend: "Ext.panel.Panel",
	alias: "widget.MapLayout",
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
                    origin: {
                        width: 500,
                        height: 300
                    },
    				
	            	xtype: 'box',
	            	ref: "map",
	            	autoEl: {
	                	tag: 'img',
	                	src: MsAdmin.constants.BG_IMAGE_SRC,
	                	style: {
	                    	width: "1000px",
	                    	height: "600px"
	                	}
	            	}
	            },
	            listeners: {
	            	render: this.attachDD
	            },
                dockedItems: this.getCjDockedItemsConfig()
        	})
	    ]);
    },
    getCjDockedItemsConfig: function() {
        return [{
            dock: 'bottom',
            xtype: 'toolbar',
            items: [{
                hidden: true,
                fieldLabel: "zoom",
                ref: "MapZoomSlider",
                xtype: "slider",
                width: 300,
                value: 250,
                increment: 5,
                minValue: 0,
                maxValue: 2000
            }, '->', {
                xtype: "button",
                ref: "savePosButton",
                text: "Save position"
            }, {
                xtype: "button",
                ref: "refreshBtn",
                text: "Refresh"
            }]
        }];
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
