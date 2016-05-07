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
        'authentication',
        function ($scope,authentication) {
            $scope.login = function (user) {
                console.log(user);
                authentication.loginUser(user);
            };

            $scope.register = function (user) {
                console.log(user);
                authentication.registerUser(user)
                    .then(function(registeredUser){
                        console.log(registeredUser);
                    });
            }
        }
    ]);