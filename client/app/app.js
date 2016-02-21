'use strict';

(function () {

    angular.module('proftestApp', [
            'proftestApp.auth',
            'proftestApp.admin',
            'proftestApp.constants',
            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ngRoute',
            'validation.match'
        ])
        .config(($routeProvider, $locationProvider) => {
            $routeProvider
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true);
        });

})();
