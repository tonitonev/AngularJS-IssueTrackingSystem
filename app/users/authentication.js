angular.module('issueTracker.users.authentication', [])
    //this factory is a service
    .factory('authentication', [
        '$http',
        '$cookies',
        '$q',
        '$location',
        'identity',
        'BASE_URL',
        function ($http, $cookies, $q, $location, identity, BASE_URL) {
            //console.log(BASE_URL);

            var AUTHENTICATION_COOKIE_KEY = '!__Authentication_Cookie_Key__!';

            function preserveUserData(data) {
                var accessToken = data.access_token;
                console.log(data);

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $cookies.put(AUTHENTICATION_COOKIE_KEY, accessToken);

            }

            function registerUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Register', user)
                    .then(function (response) {
                        preserveUserData(response.data);

                        identity.requestUserProfile()
                            .then(function () {
                                deferred.resolve(response.data);
                            });
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
                        preserveUserData(response.data);

                        identity.requestUserProfile()
                            .then(function () {
                                deferred.resolve(response.data);
                            });

                    });

                return deferred.promise;
            }

            function isAuthenticated() {
                return !!$cookies.get(AUTHENTICATION_COOKIE_KEY); //!! changes to true or false
            }

            function logout() {
                $cookies.remove(AUTHENTICATION_COOKIE_KEY);
                $http.defaults.headers.common.Authorization = undefined;
                identity.removeUserProfile();
                $location.path('/');
            }

            function refreshCookie() {
                if (isAuthenticated()) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get(AUTHENTICATION_COOKIE_KEY);
                    identity.requestUserProfile();
                }
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                isAuthenticated: isAuthenticated,
                refreshCookie: refreshCookie,
                logout: logout
            }
        }]);