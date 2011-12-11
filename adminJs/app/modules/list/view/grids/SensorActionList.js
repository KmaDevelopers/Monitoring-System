Ext.define("app.modules.list.view.SensorActionList", {
	extend: "app.components.actionList.view.List",
    store: "Sensors",
	alias: 'widget.SensorList',
	constructor: function(config) {
		this.callParent([Ext.applyIf(config || {}, {
            columns: [{
                tdCls: 'list-td',
                flex: .7,
                header: "Location",
                dataIndex: "name"
            }, this.getEditActionColumn()]
		})]);
	}
});