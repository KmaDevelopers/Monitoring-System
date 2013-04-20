Ext.define "MsAdmin.components.basic.NoticeHandler",
  singleton: true
  constructor: ->
    MsAdmin.Event.on "notice", @showNotice, this

  showNotice: (config) ->
    config = Ext.applyIf(config or {},
      msg: ""
    )
    @getWindow(config).show()

  getWindow: (config) ->
    Ext.create "MsAdmin.components.ux.Notification",
      html: config.msg

