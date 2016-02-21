'use strict';

(function () {

    angular.module('proftestApp.auth', [
            'proftestApp.constants',
            'proftestApp.util',
            'ngCookies',
            'ngRoute'
        ])
        .config(($httpProvider) => {
            $httpProvider.interceptors.push('authInterceptor');
        });

})();

