angular.module('issueTracker.users.authentication', [])
    //this factory is a service
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            //console.log(BASE_URL);

            function registerUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Register', user)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {

                    });

                return deferred.promise;
            }

            function loginUser(user) {
                var deferred = $q.defer();
                user.grant_type = 'password';
                console.log(user);

                $http.post(BASE_URL + 'api/Token', user)
                    .then(function (response) {
                        console.log(response.data);
                        deferred.resolve(response.data);
                    }, function () {

                    });

                return deferred.promise;
            }

            function logout() {

            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout
            }
        }]);