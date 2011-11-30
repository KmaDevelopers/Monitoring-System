Ext.ns("MsAdmin");
MsAdmin.links = {
	server: {
		methods: {
			create: "PUT",
			read: "GET",
			update: "POST",
			destroy: "DELETE"
		},
		url: "/server"
		//url: "/adminJs/app/data/server.php"
	},
	sensor: {
		methods: {
			create: "PUT",
			read: "GET",
			update: "POST",
			destroy: "DELETE"
		},
		//url: "/adminJs/app/data/sensor.php"
		url: "sensor"
	}
}