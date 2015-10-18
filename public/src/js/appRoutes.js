// public/js/appRoutes.js

angular.module('time').config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
        .state('login', {
            url: '/',
            views: {
                'content@': { 
                    templateUrl: 'views/login.html',
                    controller: 'LoginController'
                }
            }
        })

        .state('account_create', {
            url: '/account/create',
            views: {
                'content@': {
                    templateUrl: 'views/createAccount.html',
                    controller: 'CreateAccountController'
                }
            }
        })

        .state('home', {
            url: '/app',
            views: {
                'content@': {
                    templateUrl: 'views/app.html',
                    controller: 'AppController'
                }
            }
        })

        .state('categories', {
            url: '/app/categories',
            views: {
                'content@': {
                    templateUrl: 'views/categories.html',
                    controller: 'CategoryController'
                }
            }
        });

    $urlRouterProvider.otherwise('/');
});
