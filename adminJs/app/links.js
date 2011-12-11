Ext.ns("MsAdmin");
MsAdmin.links = {
	server: {
		methods: {
			create: "POST",
			read: "GET",
			update: "PUT",
			destroy: "DELETE"
		},
		url: "/server"
		//url: "/adminJs/app/data/server.php"
	},
	sensor: {
		methods: {
			create: "POST",
			read: "GET",
			update: "PUT",
			destroy: "DELETE"
		},
		//url: "/adminJs/app/data/sensor.php"
		url: "sensor"
	}
}