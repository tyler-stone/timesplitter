angular.module('time').factory('categories', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/categories');
        },

        create : function(categoryData) {
            return $http.post('/api/categories', categoryData);
        },

        update : function(categoryData) {
            return $http.put('/api/categories/' + categoryData._id, categoryData);
        },

        delete : function(id) {
            return $http.delete('/api/categories/' + id);
        }
    };       
}]);
