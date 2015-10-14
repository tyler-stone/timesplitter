angular.module('time').controller('LoginController', function($scope, $state, $log, auth) {
	$scope.email = "";
	$scope.password = "";

	$scope.doLogin = function() {
		auth.login($scope.email, $scope.password).then(function(result) {
			if (result) {
				$log.debug(result);
				$state.go('home');
			}
		});
	};
});