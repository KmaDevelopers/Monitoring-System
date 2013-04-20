Ext.define "MsAdmin.mixins.FormControllerMixin",
  
  #TODO
  markInvalid: (form, errors) ->
    unless errors instanceof Ext.data.Errors
      for i of errors
        errors[i] = errors[i][0]
    form.markInvalid errors
