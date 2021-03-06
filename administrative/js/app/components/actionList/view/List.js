Ext.define("app.components.actionList.view.List", {
	extend: "Ext.grid.Panel",
	constructor: function() {
		this.addEvents({
            editiconclick: true
        });  
	},
	getEditActionColumn: function() {
		return {
            xtype:'actioncolumn',
            tdCls: 'list-td edit-link',
            align: 'center',
            flex: .3,
            items: [{
                icon: MsAdmin.constants.IMAGE_PATH + 'edit-icon.png',  // Use a URL in the icon config
                tooltip: 'Edit',
                handler: this.onEditIconClick,
                scope: this
            }]
        };
	},
	onEditIconClick: function(grid,rIdx, cIdx) {
        var selModel = this.getSelectionModel();
            selModel.select(rIdx);

        this.fireEvent('editiconclick', selModel.getSelection()[0], rIdx, cIdx);
	}
});
