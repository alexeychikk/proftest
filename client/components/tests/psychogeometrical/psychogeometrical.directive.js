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

    controller.$inject = ['$scope', 'User', 'localStorageService'];
    function controller($scope, User, localStorageService) {
        let vm = this,
            testKey = vm.id,
            answers = JSON.parse(localStorageService.get(testKey)) || [];
    }
})();
