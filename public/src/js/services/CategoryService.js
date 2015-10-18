angular.module('time').factory('categories', function($http, auth) {
    return {
        get : function() {
            return $http({
                method: 'GET',
                url: '/api/categories',
                headers: auth.getHeaders()
            });
        },

        create : function(category) {
            return $http({
                method: 'POST',
                url: '/api/categories',
                headers: auth.getHeaders(),
                data: category
            });
        },

        update : function(category) {
            return $http({
                method: 'PUT',
                url: '/api/categories/' + category._id,
                headers: auth.getHeaders(),
                data: category
            });
        },

        delete : function(id) {
            return $http({
                method: 'DELETE',
                url: '/api/categories/' + id,
                headers: auth.getHeaders()
            });
        }
    };       
});
