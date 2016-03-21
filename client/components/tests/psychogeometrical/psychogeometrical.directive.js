"use strict";

(function () {
    angular.module('proftestApp.test')
        .directive('psychogeometrical', () => {

            return {
                restrict: 'E',
                templateUrl: 'components/tests/psychogeometrical/psychogeometrical.html',
                scope: {
                    id: '@testId',
                    data: '=data'
                },
                controllerAs: 'vm',
                bindToController: true,
                controller: controller
            };


        });

    controller.$inject = ['$scope', 'User'];
    function controller($scope, User) {
        let vm = this;
    }
})();
