Ext.ns "MsAdmin"
MsAdmin.links =
  server:
    methods:
      create: "POST"
      read: "GET"
      update: "PUT"
      destroy: "DELETE"

    url: "/server"

  sensor:
    methods:
      create: "POST"
      read: "GET"
      update: "PUT"
      destroy: "DELETE"

    url: "/sensor"