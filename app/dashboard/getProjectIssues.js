angular.module('issueTracker.dashboard', [])
    .factory('getProjectIssues', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function latest(pageSize) {
                pageSize = pageSize || 2;

                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/' + pageSize + '/issues')
                    .then(function (projectsIssues) {
                        deferred.resolve(projectsIssues);
                    });

                return deferred.promise;
            }

            return {
                latest: latest
            }
        }]);