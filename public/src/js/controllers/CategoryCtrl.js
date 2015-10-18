angular.module('time').controller('CategoryController', function($scope, $state, $log, categories) {
	$scope.newCategory = {};
	$scope.categories = [];

	$scope.isValidCategory = function(category) {
		if (category.name === null || category.name === undefined || 
			category.name.length <= 0 || category.color === null || 
			category.color === undefined) {
			return false;
		} else {
			return true;
		}
	};

	$scope.doCreateCategory = function() {
		if ($scope.isValidCategory($scope.newCategory)) {
			console.log($scope.newCategory);
			categories.create($scope.newCategory).then(function(result) {
				doRefresh();
			});
		}
	};

	var doRefresh = function() {
		categories.get().then(function(result) {
			if (result.data) {
				$scope.categories = result.data;
			}
		});
	};

	doRefresh();
});