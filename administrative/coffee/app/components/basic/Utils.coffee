Ext.define "MsAdmin.components.basic.Utils",
  singleton: true
  alternateClassName: "MsAdmin.Utils"
  translations:
    Origin: "Translated"

  translate: (message) ->
    @translations[message] or message


# shortcuts
(->
  MsAdmin.t = (message) ->
    MsAdmin.Utils.translate message
)()