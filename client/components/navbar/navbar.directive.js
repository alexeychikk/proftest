"use strict";

(function () {

    angular.module('proftestApp')
        .directive('navbar', () => ({
            templateUrl: 'components/navbar/navbar.html',
            restrict: 'E',
            replace: true,
            controller: 'NavbarController',
            controllerAs: 'nav'
        }));

})();
