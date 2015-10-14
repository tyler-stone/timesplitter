// public/js/appRoutes.js

angular.module('time').config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
        .state('login', {
            url: '/',
            views: {
                'content@': { 
                    templateUrl: 'views/login.html',
                    controller: 'LoginController',
                }
            }
        });

    $urlRouterProvider.otherwise('/');
});
