Ext.define "MsAdmin.store.Servers",
  extend: "Ext.data.Store"
  fields: ["name", "serverId"]
  model: "MsAdmin.model.Server"
  autoLoad: true
  listeners:
    update: (store, model, operation, eventOptions) ->
      if operation is Ext.data.Model.EDIT
        false
      else true  if operation is Ext.data.Model.COMMIT
