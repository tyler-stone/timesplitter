angular.module('time').factory('users', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/users');
        },

        create : function(user) {
            return $http.post('/api/users', user);
        },

        update : function(user) {
            return $http.put('/api/users/' + user._id, user);
        },

        delete : function(id) {
            return $http.delete('/api/users/' + id);
        }
    };       
}]);
