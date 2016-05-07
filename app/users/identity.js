angular.module('socialNetwork.users.identity', [])
    .factory('identity', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {
        
            var deferred = $q.defer();
        
            var currentUser = undefined;
        

            
            $http.get(BASE_URL + 'Users/me')
                .then(function(response) {
                    currentUser = response.data;
                    deferred.resolve(currentUser);
                });
            
            return {
                getCurrentUser: function () {
                    if (currentUser) {
                        return $q.when(currentUser);
                    }
                    else {
                        return deferred.promise;
                    }
                },
                isAuthenticated: function () {
                    return true;
                }
            };
    }]);