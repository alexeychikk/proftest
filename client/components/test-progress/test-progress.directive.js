"use strict";

(function () {
    angular.module('proftestApp.test')
        .directive('testProgress', () => {

            return {
                restrict: 'E',
                templateUrl: 'components/test-progress/test-progress.html',
                scope: {
                    progress: '='
                },
                controllerAs: 'vm',
                bindToController: true,
                controller: controller
            };


        });

    controller.$inject = ['$scope', 'localStorageService'];
    function controller($scope, localStorageService) {
        let vm = this;

        vm.countersSum = +localStorageService.get('countersSum') || 0;
        var recuvered = !!vm.countersSum;

        vm.oldCategoryIndex = 0;

        $scope.$watch('vm.progress.currentQuestionIndex', function (index) {
            if (vm.progress.currentCategoryIndex === vm.oldCategoryIndex) {
                vm.counter = vm.oldCategoryIndex ? index + vm.countersSum : index;
            } else {
                vm.savedIndex = index;
                vm.counter++;
            }
        });
        $scope.$watch('vm.progress.currentCategoryIndex', function (index) {
            vm.oldCategoryIndex = index;
            if (index) {
                vm.countersSum = vm.counter;
                vm.counter = (recuvered ? --vm.countersSum : vm.countersSum) + vm.savedIndex;
                vm.savedIndex = 0;
                localStorageService.set('countersSum', vm.countersSum);
            }
        }, true);

        $scope.$watch('vm.progress.questionsCount', getMaxCount);

        angular.element(window).on('resize', getMaxCount);

        function getMaxCount(count) {
            let result = reduceCount(count);
            vm.range = new Array(result.particle);
            vm.remainder = result.remainder;
        }

        function reduceCount(count) {
            vm.divider = Math.ceil(window.innerWidth / 146);
            if (count > vm.divider) {
                return {particle: Math.ceil(count / vm.divider), remainder: count % vm.divider};
            } else {
                return {particle: count};
            }
        }
    }
})();