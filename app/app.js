'use strict';

angular.module('issueTracker', [
        'ngRoute',
        'ngCookies',
        'issueTracker.common',
        'issueTracker.home',
        'issueTracker.dashboard',
        'issueTracker.users.identity'

    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .run(['authentication', function (authentication) {
        //console.log(authentication);
        authentication.refreshCookie()
    }])
    .constant('jQuery', $)
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
