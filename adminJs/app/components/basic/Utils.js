Ext.define("MsAdmin.components.basic.Utils", {
	singleton: true,
	alternateClassName: "MsAdmin.Utils",
	translations: {
		"Origin": "Translated"	
	},
	translate: function(message) {		
		return this.translations[message] || message;
	}
});
// shortcuts
(function(){
	MsAdmin.t = function(message){
		return MsAdmin.Utils.translate(message);
	}
})();