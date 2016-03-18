"use strict";

(function () {
	angular.module('proftestApp.test')
		.directive('thinkingCreativity', () => {

				return {
					restrict: 'E',
					templateUrl: 'components/tests/thinking-creativity/thinking-creativity.html',
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
			questionIndexKey = testKey + 'questionIndex',
			answers = JSON.parse(localStorageService.get(testKey)) || [];

		vm.currentQuestionIndex = +localStorageService.get(questionIndexKey) || 0;

		vm.getCurrentQuestion = () => vm.data.questions[vm.currentQuestionIndex];

		vm.nextQuestion = () => {
			vm.currentQuestionIndex++;
			localStorageService.set(questionIndexKey, vm.currentQuestionIndex);
			return vm.currentQuestionIndex;
		};

		vm.prevQuestion = () => {
			vm.currentQuestionIndex--;
			localStorageService.set(questionIndexKey, vm.currentQuestionIndex);
			return vm.currentQuestionIndex;
		};

		vm.answer = (value) => {
			answers[vm.currentQuestionIndex] = value;
			localStorageService.set(testKey, JSON.stringify(answers));

			vm.nextQuestion();

			if (!vm.getCurrentQuestion()) {
				User.putMyAnswers({}, {
					testId: vm.id,
					answers: answers
				}).$promise.then((resp) => {
					localStorageService.remove(testKey, questionIndexKey);
					vm.result = resp;
				})
			}
		};
	}
})();

