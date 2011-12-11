Ext.define("MsAdmin.view.sensor.SensorViewWindow", {
	extend: "Ext.window.Window",
	alias: 'widget.SensorViewWindow',
	constructor: function(config) {
		this.callParent([
			Ext.applyIf(config || {}, {
				closeAction: 'hide',
				layout: 'fit',
				autoShow: true,
				buttons: this.getCmpButtons(),
				items: this.getItemsConfig()
			})
		]);
	},
	loadModel: function(model) {
		this.setTitle('Server ' + model.get('name'));
		this.down('form').getForm().loadRecord(model);
	},
	getCmpButtons: function() {
		return [{
			text: MsAdmin.t("Save"),
			ref: 'saveButton'
		}, {
			text: MsAdmin.t("Close"),
			ref: 'closeButton',
			handler: function() {
				this.up('window').close();
			}
		}]	
	},
	getItemsConfig: function() {
		return [{
			xtype: "form",
			bodyPadding: 15,
			defaults: {
				labelWidth: 120	
			},
			items: [{
				xtype: "textfield",
				name: "name",
				fieldLabel: MsAdmin.t("Name")
			}, {
				xtype: 'textfield',
				name: "location",
				fieldLabel: MsAdmin.t("Location")
			}, {
				xtype: 'textfield',
				name: 'serial',
				fieldLabel: MsAdmin.t("Serial")
			}]
		}]
	},

	getForm: function() {
		return this.down('form').getForm();
	}
});