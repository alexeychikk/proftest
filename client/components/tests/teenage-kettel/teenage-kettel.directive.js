"use strict";

(function () {
    angular.module('proftestApp.test')
        .directive('teenageKettel', () => {

            return {
                restrict: 'E',
                templateUrl: 'components/tests/teenage-kettel/teenage-kettel.html',
                scope: {
                    id: '@testId',
                    data: '=data',
                    index: '='
                },
                controllerAs: 'vm',
                bindToController: true,
                controller: controller
            };


        });

	controller.$inject = ['$scope', 'localStorageService', 'Auth', 'User', '$location'];
	function controller($scope, localStorageService, Auth, User, $location) {
        let vm = this,
            testKey = vm.id,
            questionIndexKey = testKey + 'questionIndex',
			resultKey = testKey + 'result',
            answers = JSON.parse(localStorageService.get(testKey)) || [];

		vm.currentAnswer = 0;

        vm.index.currentQuestionIndex = +localStorageService.get(questionIndexKey) || 0;

        vm.getCurrentQuestion = () => vm.data.questions[vm.index.currentQuestionIndex];

        vm.nextQuestion = () => {
            vm.index.currentQuestionIndex++;
            localStorageService.set(questionIndexKey, vm.index.currentQuestionIndex);
            return vm.index.currentQuestionIndex;
        };

        vm.prevQuestion = () => {
            vm.index.currentQuestionIndex--;
            localStorageService.set(questionIndexKey, vm.index.currentQuestionIndex);
            return vm.index.currentQuestionIndex;
        };

        vm.answer = (value) => {
            answers[vm.index.currentQuestionIndex] = value;
            localStorageService.set(testKey, JSON.stringify(answers));
			vm.currentAnswer = 0;

            vm.nextQuestion();

            if (!vm.getCurrentQuestion()) {
                User.putMyAnswers({}, {
                    testId: vm.id,
                    answers: answers
                }).$promise.then((resp) => {
					var result;

                    localStorageService.remove(questionIndexKey);

					result = resp.result;
					for (let prop in result) {
						let item = result[prop];
						item.name = vm.data.factors[prop].name;
						item.description = vm.data.factors[prop][item.level];
						item.level = item.level === 'high' ? 'высокий' : 'низкий';
					}

					localStorageService.set(resultKey, JSON.stringify(result));
					$location.url('/result/' + Auth.getCurrentUser()._id + '/' + vm.id);
                })
            }
        };
    }
})();
