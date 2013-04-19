Ext.define("MsAdmin.mixins.FormControllerMixin", {
	//TODO
	markInvalid: function(form, errors) {
		if (!(errors instanceof Ext.data.Errors)) {
			for(i in errors) { 
				errors[i] = errors[i][0]; 
			}
		}

		form.markInvalid(errors);
	}
});