angular.module('issueTracker.dashboard', [
        'issueTracker.dashboard.getProjectIssues'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashBoardCtrl'
        })
    }])
    .controller('DashBoardCtrl', [
        '$scope',
        'getProjectIssues',
        function ($scope, projectIssues) {

            projectIssues.latest()
                .then(function (latestProjectIssues) {
                    $scope.latestProjectIssues = latestProjectIssues;
                });
        }]);