angular.module('time').factory('auth', function($http, $q, $log) {
    var token = null;
    var user = null;
    var authenticate = function(email, password) {
        $log.debug('Sending token request...');
        return $http.post('/api/authenticate', {
            'email': email,
            'password': password
        });
    };

    return {
        login : function(email, password) {
            var deferred = $q.defer();
            if (!token) {
                authenticate(email, password).then(function(result) {
                    if (result.data.token) {
                        token = result.data.token;
                        user = result.data.user;
                        deferred.resolve(token);
                    } else {
                        deferred.resolve();
                    }
                });
            } else {
                deferred.resolve(token);
            }

            return deferred.promise;
        },

        isLoggedIn : function() {
            return (token !== null && user !== null);
        },

        logout : function() {
            token = null;
            user = null;
        },

        getHeaders : function() {
            return {
                'content-type' : 'application/json',
                'x-access-token' : token 
            };
        }
    };       
});
