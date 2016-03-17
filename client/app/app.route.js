"use strict";

(function () {

    angular.module('proftestApp')
        .config(($routeProvider, $locationProvider, localStorageServiceProvider) => {
            $routeProvider
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true);
			localStorageServiceProvider.setPrefix('proftestApp');
        });

})();
