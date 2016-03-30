"use strict";

(function () {
    angular.module('proftestApp.test')
        .directive('professionChoiceResult', () => {

            return {
                restrict: 'E',
                templateUrl: 'components/tests-results/profession-choice/profession-choice-result.html',
                controllerAs: 'vm',
                bindToController: true,
                controller: controller
            };
        });

    controller.$inject = ['$scope', 'User', '$routeParams', 'localStorageService'];
    function controller($scope, User, $routeParams, localStorageService) {
        let vm = this,
			testKey = $routeParams.testId,
			resultKey = testKey + 'result';

		vm.answers = JSON.parse(localStorageService.get(testKey));
		vm.result = {};

		if (vm.answers) {
			vm.result = JSON.parse(localStorageService.get(resultKey));
			localStorageService.remove(testKey, resultKey);
		} else {
			vm.admin = true;
			User.getOne({
				id: $routeParams.userId,
				fields: { fullName: true, tests: true }
			}, (resp) => {
				var test = resp.tests.find((item) => item._id == testKey);
				vm.result = test.result;
				vm.answers = test.answers;
				vm.name = resp.fullName;
				vm.passingDate = test.passingDate;
			});
		}
    }
})();
