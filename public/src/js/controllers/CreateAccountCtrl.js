angular.module('time').controller('CreateAccountController', function($scope, $state, $log, users) {
	$scope.user = {
		name: '',
		email: '',
		password: '',
		admin: false
	};

	$scope.doCreate = function() {
		users.create($scope.user).then(function(result) {
			if (result) {
				$log.debug(result);
				$state.go('home');
			}
		});
	};
});