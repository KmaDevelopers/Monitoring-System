Ext.define "MsAdmin.core.EventBus",
  singleton: true
  alternateClassName: "MsAdmin.Event"
  extend: "Ext.util.Observable"
  fire: ->
    @fireEvent.apply this, arguments_
