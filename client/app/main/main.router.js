'use strict';

(function () {

  angular.module('proftestApp')
    .config(($routeProvider) => {
      $routeProvider
        .when('/', {
          templateUrl: 'app/main/main.html',
          controller: 'MainController',
          controllerAs: 'main'
        });
    });

})();
