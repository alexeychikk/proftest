"use strict";

(function () {

    angular.module('proftestApp.test')
        .config(($routeProvider) => {
            $routeProvider
                .when('/test/:id', {
                    templateUrl: 'app/test/about.html',
                    controller: 'TestController',
                    controllerAs: 'vm'
                })
                .when('/test/:id/:category?/:question?', {
                    templateUrl: 'app/test/question.html'
                });
        });

})();
