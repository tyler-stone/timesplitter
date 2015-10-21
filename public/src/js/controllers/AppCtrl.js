angular.module('time').controller('AppController', function($scope, $state, $log, categories, timeentries) {
	$scope.day = new Date(new Date().toDateString());
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

	$scope.$watch('day', function() {
		console.log($scope.day);
		doLoadingRefresh();
	});

	var doRefresh = function() {
		timeentries.getByDay($scope.day).then(function(result) {
			if (result.data) {
				$scope.timeEntries = result.data;
			}
		});
	};

	var doLoadingRefresh = function() {
		$scope.loadComplete = false;
		timeentries.getByDay($scope.day).then(function(result) {
			$scope.loadComplete = true;
			if (result.data) {
				$scope.timeEntries = result.data;
			}
		});
	};

	categories.get().then(function(result) {
		$scope.loadComplete = true;
		if (result.data) {
			$scope.categories = result.data;
		}
	});

	doRefresh();
});