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
				link: link,
				controller: controller
            };


        });

	function link($scope, $element, $attrs, $vm) {
		$vm.scrollToThis = (smoothScroll) => smoothScroll($element[0], { duration: 500 })
	}

	controller.$inject = ['$scope', 'localStorageService', 'smoothScroll'];
    function controller($scope, localStorageService, smoothScroll) {
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
			vm.scrollToThis(smoothScroll);
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
            let result = reduceCount(vm.progress.questionsCount);
            vm.range = new Array(result.particle);
            vm.remainder = result.remainder;

			if(!angular.isNumber(count)) $scope.$apply();
        }

        function reduceCount(count) {
            vm.particle = Math.ceil(window.innerWidth / 250);
            if (count > vm.particle) {
				vm.divider = Math.ceil(count / vm.particle);
                return {particle: vm.particle, remainder: count % vm.divider};
            } else {
                return {particle: count};
            }
        }
    }
})();
