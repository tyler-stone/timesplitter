angular.module('time').controller('LoginController', function($scope, $state, $log, auth) {
	$scope.email = "";
	$scope.password = "";
	$scope.loadComplete = true;

	$scope.doLogin = function() {
		$scope.loadComplete = false;
		auth.login($scope.email, $scope.password).then(function(result) {
			$scope.loadComplete = true;
			if (result) {
				$log.debug(result);
				$state.go('home');
			}
		});
	};
});