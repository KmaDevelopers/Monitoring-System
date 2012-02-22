Ext.define("MsAdmin.core.widget.EditList", {
	extend: "Ext.grid.Panel",
    plugins: [{
        ptype: 'cellediting'
    }],
    // requires: [
    //     'Ext.grid.plugin.EditingView'
    // ],
    constructor: function(config) {
        this.callParent([
            Ext.applyIf(config || {}, {
                actionClicked: false,
                listeners: {
                    beforeitemclick: this.onBeforeItemClick
                }
            })
        ]);
    },
    
    onBeforeItemClick: function() {
        if(this.actionClicked) {
            this.actionClicked = false;
            return false;
        }
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
	},
	onIconClick: function(actionName) {
        return function(grid,rIdx, cIdx) {
            // var selModel = this.getSelectionModel();
            //     selModel.select(rIdx);
            this.fireEvent(actionName + 'iconclick', grid.getStore().getAt(rIdx), rIdx, cIdx);
        }
	},

    getActiveActionColumn: function() {
        return {
            flex: 0.1,
            header: "Active",
            align: 'center',
            dataIndex: 'active',
            editor: {
                inputValue: 1,
                xtype: 'checkbox'
            }
        }
    }
});