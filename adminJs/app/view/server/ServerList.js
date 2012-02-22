Ext.define("MsAdmin.view.server.ServerList", {
    extend: "MsAdmin.core.widget.EditList",
    store: "Servers",
	alias: 'widget.ServerList',
	constructor: function(config) {
		this.callParent([Ext.applyIf(config || {}, {
            columns: [{
                flex: .5,
                tdCls: 'list-td',
                header: "Name",
                dataIndex: "name"
            }, this.getEditActionColumn()]
		})]);

        this.addEvents({
            editiconclick: true
        });  
	},

    getEditActionColumn: function() {
        return {
            xtype:'actioncolumn',
            tdCls: 'list-td edit-link',
            align: 'center',
            flex: .5,
            items: [{
                icon: MsAdmin.constants.IMAGE_PATH + 'graphic-icon.png',  // Use a URL in the icon config
                tooltip: 'Show Graphic',
                handler: this.onIconClick('graphic'),
                scope: this,
                getClass: function() {
                    return 'graphic-icon';
                }
            }, {
                icon: MsAdmin.constants.IMAGE_PATH + 'edit-icon.png',  // Use a URL in the icon config
                tooltip: 'Edit',
                handler: this.onIconClick('edit'),
                scope: this,
                getClass: function() {
                    return 'edit-icon';
                }
            }, {
                tooltip: 'Active',
                handler: this.onIconClick('active'),
                getClass: function(htmlEl, meta, record) {
                    return record.get('active') == 0 ? 'inactive-icon' : 'active-icon';
                },
                scope: this
            }]
        };
    }
});