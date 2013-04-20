Ext.define "MsAdmin.view.server.TemperatureGraphic",
  alias: "widget.TemperatureGraphic"
  extend: "Ext.chart.Chart"
  requires: ["Ext.chart.*"]
  constructor: (config) ->
    @callParent [Ext.applyIf(config or {},
      animate: true
      legend:
        position: "bottom"
    )]
