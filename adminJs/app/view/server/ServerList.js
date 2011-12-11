Ext.define("MsAdmin.view.server.ServerList", {
    extend: "MsAdmin.core.widget.EditList",
    store: "Servers",
	alias: 'widget.ServerList',
	constructor: function(config) {
		this.callParent([Ext.applyIf(config || {}, {
            columns: [{
                flex: .7,
                tdCls: 'list-td',
                header: "Name",
                dataIndex: "name"
            }, this.getEditActionColumn()]
		})]);

        this.addEvents({
            editiconclick: true
        });  
	},
});