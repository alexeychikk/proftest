'use strict';

(function () {

  angular.module('proftestApp.admin')
    .config(($routeProvider) => {
      $routeProvider
        .when('/admin', {
          templateUrl: 'app/admin/admin.html',
          controller: 'AdminController',
          controllerAs: 'admin',
          authenticate: 'admin'
        });
    });

})();

