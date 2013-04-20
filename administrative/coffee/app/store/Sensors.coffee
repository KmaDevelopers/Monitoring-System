Ext.define "MsAdmin.store.Sensors",
  extend: "Ext.data.Store"
  model: "MsAdmin.model.Sensor"
  autoLoad: false
  listeners:
    update: (store, model, operation, eventOptions) ->
      if operation is Ext.data.Model.EDIT
        false
      else true  if operation is Ext.data.Model.COMMIT
