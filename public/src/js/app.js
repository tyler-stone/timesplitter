// public/js/app.js
angular.module('time', ['ui.bootstrap', 'ui.validate', 'ui.router']).run(function ($state, $rootScope, $log, $window, $location, auth) {
	var bypassAuthCheck = false;   

	$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
		if (bypassAuthCheck) {
			bypassAuthCheck = false;
			return;
		}

		e.preventDefault();
		bypassAuthCheck = true;
		$rootScope.toState = toState;
		$rootScope.toParams = toParams;

		var isLoggedIn = auth.isLoggedIn();

		if (isLoggedIn) {
			if ($state.current.name == toState) {
				bypassAuthCheck = false;
			} else {
				$state.go(toState, toParams);
			}
		} else {
			if ($state.current.name === 'login' || $state.current.name === 'account_create') {
				bypassAuthCheck = false;
			} else {
				if ($rootScope.toState === 'account_create') {
					$state.go('account_create');
				} else {
					$state.go('login');
				}
			}
		}
	});
});