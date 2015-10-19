angular.module('time').directive('pieChart', function() {
	var processEntries = function(entries) {
		var parsed = {};
			
		for (var i = 0; i < entries.length; i++) {
			var current = entries[i];
			if (! current.category) {
				current.category = {
					'name' : 'No Category',
					'color' : '#777777'
				};
			}

			if (parsed[current.category.name]) {
				parsed[current.category.name].y += current.hours;
			} else {
				parsed[current.category.name] = {
					'name' : current.category.name,
					'color' : current.category.color,
					'y' : current.hours
				};
			}
		}

		var parsedArray = [];
		for (var key in parsed) {
			parsedArray.push(parsed[key]);
		}

		return parsedArray;
	};

	return {
		restrict: 'C',
		replace: true,
		scope: {
			timeentries: '='
		},
		controller: function ($scope, $element, $attrs) {},
		template: '<div id="piechart" style="margin: 0 auto;"></div>',
		link: function(scope, element, attrs) {
			var chart = new Highcharts.Chart({
				chart: {
					type: 'pie',
					renderTo: 'piechart',
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					height: 500
				},
				title: {
					text: ''
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
					percentageDecimals: 1
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'Pointer',
						dataLabels: {
							enabled: true,
							color: '#000000',
							connectorColor: '#000000',
							format: '<b>{point.name}</b>: {point.percentage:.1f}%'
						}
					}
				},
				series: [{
					name: 'Time Breakdown',
					data: processEntries(scope.timeentries)
				}]
			});

			scope.$watch("timeentries", function(newEntries) {
				chart.series[0].setData(processEntries(newEntries));
			});
		}
	};
});