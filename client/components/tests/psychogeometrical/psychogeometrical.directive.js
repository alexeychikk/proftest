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

	controller.$inject = ['$scope', 'User', 'Auth', 'localStorageService', '$location'];
	function controller($scope, User, Auth, localStorageService, $location) {
		let vm = this;

		$scope.$watch('vm.data.figures', (figures) =>  {
			vm.figures = figures.map(item => item.split('.')[0]);
		}, true);

		vm.answer = () => {
			localStorageService.set(vm.id, JSON.stringify(vm.figures));

			User.putMyAnswers({}, {
				testId: vm.id,
				answers: vm.figures
			}).$promise.then(() => {
				var result;

				result = vm.figures.map((item) => {
					return {
						figure: item,
						description: vm.data.description[item]
					}
				});

				localStorageService.set(vm.id + 'result', JSON.stringify(result));
				$location.url('/result/' + Auth.getCurrentUser()._id + '/' + vm.id);
			});
		};
	}
})();
