Ext.define("app.modules.list.view.ServerActionList", {
	extend: "app.components.actionList.view.List",
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
	},
});