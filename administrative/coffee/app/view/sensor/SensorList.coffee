Ext.define "MsAdmin.view.sensor.SensorList",
  extend: "MsAdmin.core.widget.EditList"
  store: "Sensors"
  alias: "widget.SensorList"
  viewConfig:
    plugins: [
      ptype: "gridviewdragdrop"
      dragText: "Place it to map"
      ddGroup: "sensor-map"
    ]

  constructor: (config) ->
    @callParent [Ext.applyIf(config or {},
      columns: [
        tdCls: "list-td"
        flex: .7
        editable: false
        header: "Location"
        dataIndex: "name"
      , @getEditActionColumn()]
    )]
