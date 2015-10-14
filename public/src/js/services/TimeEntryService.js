ngular.module('time').factory('TimeEntryService', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/timeentries');
        },

        create : function(timeEntry) {
            return $http.post('/api/timeentries', timeEntry);
        },

        update : function(timeEntry) {
            return $http.put('/api/timeentries/' + timeEntry._id, timeEntry);
        },

        delete : function(id) {
            return $http.delete('/api/timeentries/' + id);
        }
    };       
}]);
