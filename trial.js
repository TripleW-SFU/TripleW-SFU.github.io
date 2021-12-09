//Create array for each stock
const stocks = ['AAPL','AMGN','APA','BBY','CNC','IPGP','KIM','MMC','NCLH','TFX']


//Read json files and load all info in container
var container = {}
for (let i=0;i<stocks.length;i++){
	var dates = []
	var actual = []
	var predicted = []
	var request = new XMLHttpRequest();
	request.open("GET", stocks[i].concat(".json"), false);
	request.send(null)
	var my_JSON_object = JSON.parse(request.responseText);
	index = ["0","1","2","3","4"]
	for (let j=0;j<index.length;j++){
		dates.push(my_JSON_object['Date'][j])
		actual.push(my_JSON_object['Adj Close'][j])
		predicted.push(my_JSON_object['Predicted Close'][j])}
	var actual_earning = actual[actual.length-1]-actual[0]
	var predicted_earning = predicted[predicted.length-1]-predicted[0]
	container[stocks[i]] = [dates,actual,predicted,actual_earning,predicted_earning]
}


//Random select three stocks
 function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}
var random_selected = getRandomSubarray(stocks, 3);

//Find best performance stocks(highest predicted earnings)
function sortByPredict(a, b) {
    return b[1]-a[1];
}
var temp = []
for (let i=0;i<stocks.length;i++){
	temp.push([stocks[i],container[stocks[i]][4]])
}
temp.sort(sortByPredict);
var model_selected = [temp[0][0],temp[1][0],temp[2][0]]


//Plot bar and pie
document.addEventListener('DOMContentLoaded', function () {
	var random_data = []
	for (let i=0;i<random_selected.length;i++){

		random_data.push(container[random_selected[i]][3])
	}
	var model_data = []
	for (let i=0;i<model_selected.length;i++){
		
		model_data.push(container[model_selected[i]][3])
	}

function add(accumulator, a) {
  return accumulator + a;
}

const random_sum = random_data.reduce(add, 0);
const model_sum = model_data.reduce(add, 0);



	Highcharts.chart('container1', {
		exporting: { enabled: false },
		chart: {
			type: 'column'
		},
		title: {
			text: 'Earning Evaluation'
		},
		xAxis: {
			categories: 
				["top3-stock", "top2-stock", "top1-stock",'Total']
			,
			title: {
				text: 'Stocks'
			}
		},
		yAxis: {
			title: {
				text: 'Earning in dollars per share'
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
			name: 'Random selected',
			data: (random_data.sort(function(a,b){return a - b})).concat([random_sum]),
			color: '#00A2D1'
		}, {
			name: 'Model selected',
			data: (model_data.sort(function(a,b){return a - b})).concat([model_sum]),
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
		  text: 'Portfolio Recommendation'
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
			name: model_selected[0],
			y: 0.33,
			sliced: true,
		  }, {
			name: model_selected[1],
			y: 0.33,
			sliced: true,
		  },
		  {
			name: model_selected[2],
			y: 0.33,
			sliced: true,
			color: '#FFEC00',
		  }]
		}]
	  })

	

	
})



//Plot line
document.addEventListener('DOMContentLoaded', function () {
	//ran = getRandomSubarray(stocks, 1)[0]
	ran = stocks[0]
	  Highcharts.chart('container3', {
		exporting: { enabled: false },
		chart: {
		  zoomType: 'x'
		},
		title: {
		  text: 'Dynamic Growth for ' + ran
		},
		subtitle: {
		  text: 'Actual Stock Prices vs Predicted Stock Prices'
		},
		xAxis: {
			categories: container[ran][0],
			title: {
				text: 'Date'
			  },
		
		},
		tooltip: {
			formatter: function(){
					var ans = this.point.y
					return '$'+ans.toFixed(2)
			  },
			crosshairs: [true,true]
		  },
		yAxis: {
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
				name: 'Actual',
				data: container[ran][1],
			}, {
				name: 'Predicted',
				data: container[ran][2],
			},
		]
	  });
	}
  );


  function leaveChange() {
	var stock = document.getElementById("leave").value
	 
	Highcharts.chart('container3', {
		exporting: { enabled: false },
		chart: {
		  zoomType: 'x'
		},
		title: {
		  text: 'Dynamic Growth for ' + stock
		},
		subtitle: {
		  text: 'Actual Stock Prices vs Predicted Stock Prices'
		},
		xAxis: {
				categories: container[stock][0]
			,
		  title: {
			text: 'Date'
		  },

		},
		tooltip: {
			formatter: function(){
					var ans = this.point.y
					return '$'+ans.toFixed(2)
			  },
			crosshairs: [true,true]
		  },
		yAxis: {
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
  
		series: 
		[
			{
				name: 'Actual',
				data: container[stock][1],
			}, {
				name: 'Predicted',
				data: container[stock][2],
			},
		]
	  });
	}
