angular.module('time').factory('auth', function($http, $q) {
    var token = null;    
    var authenticate = function(email, password) {
        return $http.post('/api/authenticate', {
            'email': email,
            'password': password
        });
    };

    return {
        login : function(email, password) {
            var deferred = $q.defer();
            if (!token) {
                authenticate().then(function(result) {
                    if (result.token) {
                        token = result.token;
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

        getHeaders : function() {
            return {
                'content-type' : 'application/json',
                'x-access-token' : token 
            };
        }
    };       
});
