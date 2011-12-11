Ext.define("MsAdmin.view.server.ServerViewWindow", {
	extend: "Ext.window.Window",
	alias: 'widget.ServerViewWindow',
	constructor: function(config) {
		this.callParent([
			Ext.applyIf(config || {}, {
				constrain: true,
				autoShow: true,
				minimizable: true,
				maximizable: true,
				closeAction: 'hide',
				layout: 'fit',
				//constrainHeader: true,
				buttons: this.getCmpButtons(),
				items: this.getCmpItems()
			})
		]);
	},
	loadModel: function(model) {
		this.setTitle('Server ' + model.get('name'));
		this.down('form').getForm().loadRecord(model);
	},
	getCmpItems: function() {
		return [{
			xtype: 'form',
			bodyPadding: 15,
			defaults: {
				labelWidth: 120,
				xtype: 'textfield'
			},
			items: [{
				name: "name",
				fieldLabel: MsAdmin.t("Server Name")
			}, {
				name: "path",
				fieldLabel: MsAdmin.t("Path")
			}, {
				name: "ip",
				fieldLabel: MsAdmin.t("Server IP Address")
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
	},

	getForm: function() {
		return this.down('form').getForm();
	}
});