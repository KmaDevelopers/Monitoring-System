Ext.define("app.components.layout.view.Viewport", {
    extend: "Ext.Viewport",
    layout: "border",
    autoRender: true,
    alias: "widget.Viewport",
    defaults: {
        slit: true,
        border: false
    },
    constructor: function(config) {
        this.callParent([Ext.apply(config || {}, {
            items: this.getItems()
        })]);  
    },
    getItems: function() {
        return[{            
            width: 300,
            region: "west",
            xtype: "panel",
            layout: {
                type: "fit"
            },
            items: {
                xtype: "ListsContainer"
            }
        }, {
            region: 'center'
        }]
    },
    getCenter: function() {
        return this.down('[region="center"]');
    }
});