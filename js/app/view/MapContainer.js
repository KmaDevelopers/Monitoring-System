Ext.define('KMA.view.MapContainer', {
    extend: "Ext.panel.Panel",
    alias: 'widget.map',
    dockedItems: [{
        dock: 'bottom',
        xtype: 'toolbar',
        items: ['->',
        {
            xtype: "button",
            text: "Save position"
        }, {
            xtype: "button",
            ref: "refreshBtn",
            text: "Refresh"
        }]
    }],
    constructor: function(config) {
        this.callParent([Ext.applyIf(config || {}, {
            bodyStyle: this._getBodyStyle(),
            items: this._getItems()
        })]);
    },
    _getBodyStyle: function() {
        return {
            "overflow": "auto",
            "position": "relative"
        };
    },
    _getItems: function() {
        return [{
            xtype: 'box',
            autoEl: {
                tag: 'img',
                src: KMA.constants.BG_IMAGE_SRC,
                style: {
                    width: "1300px",
                    height: "850px"
                }
            }
        }, {
            xtype: 'box',
            autoEl: {
                tag: 'h1',
                html: KMA.constants.TITLE,
                style: {
                    "text-align": "center",
                    position: "absolute",
                    top: "50px",
                    left: "650px",
                    "font-size": "40px"
                }
            }
        }];
    }
});