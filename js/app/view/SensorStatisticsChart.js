Ext.define('KMA.view.SensorStatisticsChart', {
	extend: 'Ext.chart.Chart',
	requires: ['Ext.chart.*'],
	alias: 'widget.SensorStatisticsChart',
    animate: true,
    height: 300,
    constructor: function(config) {
    	Ext.applyIf(config, {
            style: 'background:#fff',
            animate: true,
            shadow: true,
            //theme: 'Category1',
            legend: {
                position: 'right'
            },
	    	axes: [{
		        type: 'Numeric',
		        position: 'left',
		        grid: true,
		        fields: ['temperature'],
		        title: 'Temperature',
		        majorTickSteps: 30,
    			minorTickSteps: 30,
		        minimum: 0,
        		maximum: 100
    		}],
    		series: [{
        		type: 'line',
			fill: true,
        		highlight: {
				size: 7,
				radius: 15
        		},
		        axis: 'left',
		        xField: 'date',
		        yField: 'temperature',
			tips: {
			    trackMouse: true,
			    width: 200,
			    height: 45,
			    style: 'background-color:white',
			    renderer: function(storeItem, item) {
				this.html = '<span style="background-color:white;font-size:15px;">Temperature: ' + storeItem.get('temperature') + '<br />' + 'Date: ' + storeItem.get('date') + "</span>";
			    }
			}
		}]
    	});

    	this.callParent([config]);
    }
})