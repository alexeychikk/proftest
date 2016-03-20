"use strict";

(function () {

    angular.module('proftestApp.test')
        .config(($routeProvider) => {
            $routeProvider
                .when('/test/:id/about', {
                    templateUrl: 'app/test/about.html',
                    controller: 'AboutController',
                    controllerAs: 'vm',
                    authenticate: 'user'
                })
                .when('/test/:id', {
                    templateUrl: 'app/test/question.html',
					controller: 'QuestionController',
					controllerAs: 'vm',
                    authenticate: 'user'
                });
        });

})();
