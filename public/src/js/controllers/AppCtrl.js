angular.module('time').controller('AppController', function($scope, $state, $log, categories, timeentries) {
	$scope.day = new Date(new Date().toDateString());
	$scope.newEntry = {};
	$scope.timeEntries = [];
	$scope.categories = [];

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
			console.log($scope.newEntry);
			timeentries.create($scope.newEntry).then(function(result) {
				doRefresh();
			});
		}
	};

	$scope.doDeleteEntry = function(id) {
		timeentries.delete(id).then(function(result) {
			doRefresh();
		});
	};

	$scope.$watch('day', function() {
		doRefresh();
	});

	var doRefresh = function() {
		timeentries.getByDay($scope.day).then(function(result) {
			console.log(result.data);
			if (result.data) {
				$scope.timeEntries = result.data;
			}
		});
	};

	categories.get().then(function(result) {
		if (result.data) {
			$scope.categories = result.data;
		}
	});

	doRefresh();
});