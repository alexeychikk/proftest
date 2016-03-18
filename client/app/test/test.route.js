"use strict";

(function () {

    angular.module('proftestApp.test')
        .config(($routeProvider) => {
            $routeProvider
                .when('/test/:id/about', {
                    templateUrl: 'app/test/about.html',
                    controller: 'TestController',
                    controllerAs: 'vm'
                })
                .when('/test/:id', {
                    templateUrl: 'app/test/question.html',
					controller: 'QuestionController',
					controllerAs: 'vm'
                });
        });

})();
