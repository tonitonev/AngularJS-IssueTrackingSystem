'use strict';

angular.module('issueTracker', [
        'ngRoute',
        'issueTracker.home'
    ])
    .config(['$routeProvider', function($routeProvider) {
         $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
