Ext.define("MsAdmin.core.widget.EditList", {
	extend: "Ext.grid.Panel",
    plugins: [{
        ptype: 'cellediting'
    }],
    // requires: [
    //     'Ext.grid.plugin.EditingView'
    // ],
	getEditActionColumn: function() {
		return {
            xtype:'actioncolumn',
            tdCls: 'list-td edit-link',
            align: 'center',
            flex: .3,
            items: [{
                icon: MsAdmin.constants.IMAGE_PATH + 'edit-icon.png',  // Use a URL in the icon config
                tooltip: 'Edit',
                handler: this.onIconClick('edit'),
                scope: this
            }]

            /**
            , {
                icon: MsAdmin.constants.IMAGE_PATH + 'active-icon.png',  // Use a URL in the icon config
                tooltip: 'Change Active State',
                handler: this.onIconClick('active'),
                scope: this
            }
            **/
        };
	},
	onIconClick: function(actionName) {
        return function(grid,rIdx, cIdx) {
            var selModel = this.getSelectionModel();
                selModel.select(rIdx);
            this.fireEvent(actionName + 'iconclick', selModel.getSelection()[0], rIdx, cIdx);
        }
	},

    getActiveActionColumn: function() {
        return {
            header: "Active",
            align: 'center',
            dataIndex: 'active',
            editor: {
                xtype: 'checkbox'
            }
        }
    }
});