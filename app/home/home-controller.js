angular.module('issueTracker.home', [
        'issueTracker.users.authentication'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl'
        });
    }])
    .controller('HomeCtrl', [
        '$scope',
        '$location',
        'authentication',
        function ($scope, $location, authentication) {
            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function (loggedInUser) {
                        //console.log(loggedInUser);
                        $location.path('/dashboard'); //redirects to dashboard
                    });
            };

            $scope.register = function (user) {
                //console.log(user);
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        //console.log(registeredUser);
                        $location.path('/dashboard'); //redirects to dashboard
                    });
            }
        }
    ]);