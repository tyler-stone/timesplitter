angular.module('time').controller('AppController', function($scope, $state, $log, categories, timeentries) {
	$scope.day = new Date(new Date().toDateString());
	$scope.range = { begin: 0, end: 0 };
	$scope.state = "Day";
	$scope.dp = {
		opened: false
	};
	$scope.newEntry = {};
	$scope.timeEntries = [];
	$scope.categories = [];
	$scope.loadComplete = false;

	$scope.isValidEntry = function(entry) {
		if (entry.name === null || entry.name === undefined || 
			entry.name.length <= 0 || entry.hours === null || 
			entry.hours === undefined) {
			return false;
		} else {
			return true;
		}
	};

	$scope.doCreateEntry = function() {
		$scope.newEntry.date = $scope.day;
		if ($scope.isValidEntry($scope.newEntry)) {
			timeentries.create($scope.newEntry).then(function(result) {
				$scope.newEntry = {};
				doRefresh();
			});
		}
	};

	$scope.doDeleteEntry = function(id) {
		timeentries.delete(id).then(function(result) {
			doRefresh();
		});
	};

	$scope.open = function($event) {
		$event.preventDefault();
        $event.stopPropagation();
		$scope.dp.opened = true;
	};

	$scope.countHours = function() {
		var hours = 0;

		for (var i = 0; i < $scope.timeEntries.length; i++) {
			hours += $scope.timeEntries[i].hours; 
		}

		return hours;
	};

	$scope.$watch('day', function() {
		console.log($scope.day);
		$scope.range = generateRange();
		doLoadingRefresh();
	});

	$scope.$watch('state', function() {
		doLoadingRefresh();
	});

	var generateRange = function() {
		var begin = new Date($scope.day);
		begin.setDate($scope.day.getDate() - $scope.day.getDay());
		var end = new Date($scope.day);
		end.setDate($scope.day.getDate() + (7 - $scope.day.getDay()));

		return { 'begin' : begin, 'end' : end };
	};

	var doRefresh = function() {
		if ($scope.state === 'Day') {
			timeentries.getByDay($scope.day).then(function(result) {
				if (result.data) {
					$scope.timeEntries = result.data;
				}
			});
		} else {
			timeentries.getByRange($scope.range.begin, $scope.range.end).then(function(result) {
				if (result.data) {
					$scope.timeEntries = result.data;
				}
			});
		}
	};

	var doLoadingRefresh = function() {
		$scope.loadComplete = false;
		if ($scope.state === 'Day') {
			timeentries.getByDay($scope.day).then(function(result) {
				$scope.loadComplete = true;
				if (result.data) {
					$scope.timeEntries = result.data;
				}
			});
		} else {
			timeentries.getByRange($scope.range.begin, $scope.range.end).then(function(result) {
				$scope.loadComplete = true;
				console.log(result.data);
				if (result.data) {
					$scope.timeEntries = result.data;
				}
			});
		}
	};

	categories.get().then(function(result) {
		$scope.loadComplete = true;
		if (result.data) {
			$scope.categories = result.data;
		}
	});

	doRefresh();
});