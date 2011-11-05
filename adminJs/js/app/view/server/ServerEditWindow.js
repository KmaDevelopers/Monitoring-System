Ext.define("MsAdmin.view.server.ServerEditWindow", {
	extend: "Ext.window.Window",
	alias: 'widget.ServerEditWindow',
	constructor: function(config) {
		this.callParent([Ext.applyIf(config || {}, {
			constrain: true,
			closeAction: 'hide',
			width: 350,
			height: 150,
			layout: 'fit',
			constrainHeader: true,
			buttons: this.getCmpButtons(),
			items: this.getCmpItems()
		})]);
	},
	renderServerInfo: function(server) {
		this.setTitle('Server ' + server.get('name'));
	},
	getCmpItems: function() {
		return [{
			xtype: 'form',
			bodyPadding: 15,
			defaults: {
				labelWidth: 120	
			},
			items: [{
				allowBlank: false,
				xtype: 'textfield',
				fieldLabel: "Server Name"
			}, {
				allowBlank: false,
				xtype: 'textfield',
				fieldLabel: "Server IP Address"
			}]
		}];
	},
	getCmpButtons: function() {
		return [{
			ref: 'saveBtn',
			text: "Save"
		}, {
			ref: 'closeBtn',
			text: "Close"
		}]
	}
});