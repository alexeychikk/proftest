"use strict";

(function () {

    angular.module('proftestApp')
        .config(($routeProvider) => {
            $routeProvider
                .when('/login', {
                    templateUrl: 'app/account/login/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm',
					authenticate: false
                })
                .when('/logout', {
                    name: 'logout',
                    referrer: '/',
                    template: '',
                    controller: function ($location, $route, Auth) {
                        var referrer = $route.current.params.referrer ||
                            $route.current.referrer ||
                            '/';
                        Auth.logout();
                        $location.path(referrer);
                    }
                })
                .when('/signup', {
                    templateUrl: 'app/account/signup/signup.html',
                    controller: 'SignupController',
                    controllerAs: 'vm',
					authenticate: false
                })
                .when('/user/:id', {
                    templateUrl: 'app/account/account.html',
                    controller: 'AccountController',
                    controllerAs: 'vm',
                    authenticate: true
                })
                .when('/user/:id/settings', {
                    templateUrl: 'app/account/settings/settings.html',
                    controller: 'SettingsController',
                    controllerAs: 'vm',
                    authenticate: true
                });
        })

})();
