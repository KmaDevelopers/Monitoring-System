Ext.define("MsAdmin.view.server.ServerList", {
	extend: "Ext.grid.Panel",
    store: "Servers",
	alias: 'widget.ServerList',
	constructor: function(config) {
		this.callParent([Ext.applyIf(config || {}, {
            columns: [{
                flex: .8,
                tdCls: 'list-td',
                header: "Name",
                dataIndex: "name"
            }, {
                xtype:'actioncolumn',
                tdCls: 'list-td',
                align: 'center',
                flex: .2,
                items: [{
                    icon: MsAdmin.constants.IMAGE_PATH + 'edit-icon.png',  // Use a URL in the icon config
                    tooltip: 'Edit',
                    handler: this.onEditIconClick,
                    scope: this
                }]
            }]
		})]);

        this.addEvents({
            editiconclick: true
        });  
	},
    onEditIconClick: function(grid,rIdx, cIdx) {
        var selModel = this.getSelectionModel();
            selModel.select(rIdx);

        this.fireEvent('editiconclick', selModel.getSelection()[0], rIdx, cIdx);
        
    }
});