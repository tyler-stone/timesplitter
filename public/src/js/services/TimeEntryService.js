angular.module('time').factory('timeentries', function($http, auth) {
    return {
        get : function() {
            return $http({
                method: 'GET',
                url: '/api/timeentries',
                headers: auth.getHeaders()
            });
        },

        create : function(timeEntry) {
            return $http({
                method: 'POST',
                url: '/api/timeentries',
                headers: auth.getHeaders(),
                data: timeEntry
            });
        },

        update : function(timeEntry) {
            return $http({
                method: 'PUT',
                url: '/api/timeentries/' + timeEntry._id,
                headers: auth.getHeaders(),
                data: timeEntry
            });
        },

        delete : function(id) {
            return $http({
                method: 'DELETE',
                url: '/api/timeentries/' + id,
                headers: auth.getHeaders()
            });
        }
    };       
});
