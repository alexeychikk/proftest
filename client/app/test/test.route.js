(function () {

    angular.module('proftestApp.test')
        .config(($routeProvider) => {
            $routeProvider
                .when('/test/:id', {
                    templateUrl: 'app/test/about.html',
                    controller: 'TestController',
                    controllerAs: 'vm'
                })
                .when('/test/:id/:counter', {
                    templateUrl: 'app/test/question.html'
                })
                .when('/test/:id/result', {
                    templateUrl: 'app/test/result.html'
                });
        });

})();
