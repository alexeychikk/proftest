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

		$scope.$watch('vm.data.figures', function (figures) {
			vm.figures = figures.map((item) => item.split('/').pop().split('.')[0]);
		}, true);

		vm.answer = () => {
			User.putMyAnswers({}, {
				testId: vm.id,
				answers: vm.figures
			}).$promise.then((resp) => {
				vm.result = resp;
			});
		};
	}
})();
