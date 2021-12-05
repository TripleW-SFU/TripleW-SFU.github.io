const DINGUS_PRICE = 14.25;
const WIDGET_PRICE = 9.99;

var requester = new XMLHttpRequest();
requester.open("GET", "sales.json", false);
requester.send(null)
var sales = JSON.parse(requester.responseText);


document.addEventListener('DOMContentLoaded', function () {
	Highcharts.chart('container1', {
		exporting: { enabled: false },
		chart: {
			type: 'column'
		},
		title: {
			text: 'Monthly Sales'
		},
		xAxis: {
			categories: [1,2,3],
			title: {
				text: 'Month'
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Number of units sold'
			},
			lineWidth: 1,
		},
		tooltip: {
			formatter: function(){
				var ans = this.point.y
				return ans
			}
		  },
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -40,
			y: 0,
			floating: true,
			borderWidth: 1,
			backgroundColor:
				Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
			shadow: true
		},
		plotOptions: {
			series: {
				grouping: true
			}
		},
		series: [{
			name: 'Dinguses',
			data: [1,2,3],
			color: '#00A2D1'
		}, {
			name: 'Widgets',
			data: [4,5,6],
			color: '#E40001'
		}
	]
	})

	Highcharts.chart('container2', {
		exporting: { enabled: false },
		chart: {
		  plotBackgroundColor: null,
		  plotBorderWidth: null,
		  plotShadow: false,
		  type: 'pie'
		},
		title: {
		  text: 'Total Sales'
		},
		tooltip: {
				formatter: function(){
					var ans = this.point.y
					return ans
				}
			  
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -40,
			y: 0,
			floating: true,
			borderWidth: 1,
			backgroundColor:
	   Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
	  shadow: true,
	 },
	
		plotOptions: {
		  pie: {
			showInLegend: true,
			allowPointSelect: true,
			cursor: 'pointer',
			colors: [
				 '#00A2D1', 
				 '#E40001'
				  ],
				  dataLabels: {
				 enabled: true,
				 format: '<br>{point.percentage:.1f} %',
				 distance: -50,
				 filter: {
				   property: 'percentage',
				   operator: '>',
				   value: 4}}
			 ,
			point: {
			  events: {
				click: function(oEvent) {
				  callExternalFunction(oEvent.point.name);
				}
			  }
			}
		  }
		},
		series: [{
		  name: 'Brands',
		  colorByPoint: true,
		  data: [{
			name: 'Dingus',
			y: 5
		  }, {
			name: 'Widget',
			y: 10,
			sliced: true,
			selected: true
		  }]
		}]
	  })

	

	
})



function plotColumn(continent){
	let dingusValues = []
	let widgetValues = []
	let monthValues =  []
	
	for (const datum of sales[continent]) {
		let month = datum['Month'];
		let dingus = datum['Dingus'];
		let widget = datum['Widget'];
		monthValues.push(month);
		dingusValues.push( dingus);
		widgetValues.push( widget);
	}

	Highcharts.chart('container1', {
		exporting: { enabled: false },
		chart: {
			type: 'column'
		},
		title: {
			text: 'Monthly Sales'
		},
		xAxis: {
			categories: monthValues,
			title: {
				text: 'Month'
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Number of units sold'
			},
			lineWidth: 1,
		},
		tooltip: {
			formatter: function(){
				var ans = this.point.y
				return ans
			}
		  },
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -40,
			y: 0,
			floating: true,
			borderWidth: 1,
			backgroundColor:
				Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
			shadow: true
		},
		plotOptions: {
			series: {
				grouping: true
			}
		},
		series: [{
			name: 'Dinguses',
			data: dingusValues,
			color: '#00A2D1'
		}, {
			name: 'Widgets',
			data: widgetValues,
			color: '#E40001'
		}
	]
	});

	
  }

function plotPie(continent){
	let dingusValues = []
	let widgetValues = []
	
	for (const datum of sales[continent]) {
		let dingus = datum['Dingus'];
		let widget = datum['Widget'];
		dingusValues.push( dingus);
		widgetValues.push( widget);
	}
	var sumd = dingusValues.reduce(function(a, b){
		return a + b;
	}, 0);
	var sumw = widgetValues.reduce(function(a, b){
		return a + b;
	}, 0);

	document.getElementById('st1').innerHTML = sumd
	document.getElementById('st2').innerHTML = sumw
	document.getElementById('st4').innerHTML = (sumd*DINGUS_PRICE+sumw*WIDGET_PRICE).toFixed(2)


	Highcharts.chart('container2', {
		exporting: { enabled: false },
		chart: {
		  plotBackgroundColor: null,
		  plotBorderWidth: null,
		  plotShadow: false,
		  type: 'pie'
		},
		title: {
		  text: 'Total Sales'
		},
		tooltip: {
				formatter: function(){
					var ans = this.point.y
					return ans
				}
			  
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -40,
			y: 0,
			floating: true,
			borderWidth: 1,
			backgroundColor:
	   Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
	  shadow: true,
	 },
	
		plotOptions: {
		  pie: {
			showInLegend: true,
			allowPointSelect: true,
			cursor: 'pointer',
			colors: [
				 '#00A2D1', 
				 '#E40001'
				  ],
				  dataLabels: {
				 enabled: true,
				 format: '<br>{point.percentage:.1f} %',
				 distance: -50,
				 filter: {
				   property: 'percentage',
				   operator: '>',
				   value: 4}}
			 ,
			point: {
			  events: {
				click: function(oEvent) {
				  callExternalFunction(oEvent.point.name);
				}
			  }
			}
		  }
		},
		series: [{
		  name: 'Brands',
		  colorByPoint: true,
		  data: [{
			name: 'Dingus',
			y: sumd
		  }, {
			name: 'Widget',
			y: sumw,
			sliced: true,
			selected: true
		  }]
		}]
	  });
	  
	  function callExternalFunction(obj){
	  console.log(obj);
	  }
	  

}


//New program starts here





var dict = {'0':'ALL','1':'APPL','2':'MSFT','3':'GOOG','4':'AMZN','5':'TSLA'};
var dates = []
var prices = []
var stocks = []
var request = new XMLHttpRequest();
request.open("GET", "stocks.json", false);
request.send(null)
var my_JSON_object = JSON.parse(request.responseText);
my_JSON_object.forEach(element => dates.push(element['Date']));
my_JSON_object.forEach(element => prices.push(element['Adj Close']));
my_JSON_object.forEach(element => stocks.push(element['Stock']));
var jj = []

for (let i=0;i<dates.length;i++){
	var zz = [dates[i],prices[i],stocks[i]]
	jj.push(zz)
}

stock_1 = []
for (let i=0;i<jj.length;i++){
	if(jj[i][2]==1){
		var zz = [jj[i][0],jj[i][1]]
		stock_1.push(zz)
	}
}

stock_2 = []
for (let i=0;i<jj.length;i++){
	if(jj[i][2]==2){
		var zz = [jj[i][0],jj[i][1]]
		stock_2.push(zz)
	}
}

stock_3 = []
for (let i=0;i<jj.length;i++){
	if(jj[i][2]==3){
		var zz = [jj[i][0],jj[i][1]]
		stock_3.push(zz)
	}
}

stock_4 = []
for (let i=0;i<jj.length;i++){
	if(jj[i][2]==4){
		var zz = [jj[i][0],jj[i][1]]
		stock_4.push(zz)
	}
}

stock_5 = []
for (let i=0;i<jj.length;i++){
	if(jj[i][2]==5){
		var zz = [jj[i][0],jj[i][1]]
		stock_5.push(zz)
	}
}

all_data = [stock_1,stock_2,stock_3,stock_4,stock_5]



document.addEventListener('DOMContentLoaded', function () {


  
	  Highcharts.chart('container3', {
		exporting: { enabled: false },
		chart: {
		  zoomType: 'x'
		},
		title: {
		  text: 'Dynamic Growth'
		},
		subtitle: {
		  text: 'Stock Prices of all from Present-'
		},
		xAxis: {
		  type: 'datetime',
		  labels: {
			formatter: function() {
				dd = new Date(this.value)
				return (dd.getMonth()+1) + '/' + dd.getDate() + '/' + (dd.getYear()-100)
			}
		  },
		  title: {
			text: 'Date'
		  },
		  minPadding:0,
		  maxPadding:0,
		  startOnTick:false,
		  endOnTick:false
		},
		tooltip: {
			formatter: function(){
					var ans = this.point.y
					return '$'+ans.toFixed(2)
			  },
			crosshairs: [true,true]
		  },
		yAxis: {
			max:160,
			lineWidth: 1,
			tickInterval: 20,
		  title: {
			text: 'Adj Close Stock Price'
		  },
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -40,
			y: 0,
			floating: true,
			borderWidth: 1,
			backgroundColor:
	   Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
	  shadow: true,
	 },
		plotOptions: {
		  area: {
			fillColor: {
			  linearGradient: {
				x1: 0,
				y1: 0,
				x2: 0,
				y2: 1
			  },
			  stops: [
				[0, Highcharts.getOptions().colors[0]],
				[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
			  ]
			},
			marker: {
			  radius: 2
			},
			lineWidth: 1,
			states: {
			  hover: {
				lineWidth: 1
			  }
			},
			threshold: null
		  }
		},
  
		series: [
			{
				name: 'AAPL',
				data: stock_1,
			}, {
				name: 'MSFT',
				data: stock_2,
			},
			{
				name: 'GOOG',
				data: stock_3,
			}, {
				name: 'AMZN',
				data: stock_4,
			},{
				name: 'TSLA',
				data: stock_5,
			}
		]
	  });
	}
  );


  function leaveChange() {
	var stock_index = document.getElementById("leave").value

	if(stock_index==0){
		temp = [
			{
				name: 'AAPL',
				data: stock_1,
			}, {
				name: 'MSFT',
				data: stock_2,
			},
			{
				name: 'GOOG',
				data: stock_3,
			}, {
				name: 'AMZN',
				data: stock_4,
			},{
				name: 'TSLA',
				data: stock_5,
			}
		]
	}
	else{
		temp = [
			{
				name: dict[stock_index],
				data: all_data[stock_index-1],
			}
		]
	}


	 
	Highcharts.chart('container3', {
		exporting: { enabled: false },
		chart: {
		  zoomType: 'x'
		},
		title: {
		  text: 'Dynamic Growth'
		},
		subtitle: {
		  text: 'Stock Prices Predictions of ' + dict[stock_index]
		},
		xAxis: {
		  type: 'datetime',
		  labels: {
			formatter: function() {
				dd = new Date(this.value)
				return (dd.getMonth()+1) + '/' + dd.getDate() + '/' + (dd.getYear()-100)
			}
		  },
		  title: {
			text: 'Date'
		  },
		  minPadding:0,
		  maxPadding:0,
		  startOnTick:false,
		  endOnTick:false,
		  
		},
		tooltip: {
			formatter: function(){
					var ans = this.point.y
					return '$'+ans.toFixed(2)
			  },
			crosshairs: [true,true]
		  },
		yAxis: {
			max:160,
			lineWidth: 1,
			tickInterval: 20,
		  title: {
			text: 'Adj Close Stock Price'
		  },
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -40,
			y: 0,
			floating: true,
			borderWidth: 1,
			backgroundColor:
	   Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
	  shadow: true,
	 },
		plotOptions: {
		  area: {
			fillColor: {
			  linearGradient: {
				x1: 0,
				y1: 0,
				x2: 0,
				y2: 1
			  },
			  stops: [
				[0, Highcharts.getOptions().colors[0]],
				[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
			  ]
			},
			marker: {
			  radius: 2
			},
			lineWidth: 1,
			states: {
			  hover: {
				lineWidth: 1
			  }
			},
			threshold: null
		  }
		},
  
		series: temp
	  });
	}
