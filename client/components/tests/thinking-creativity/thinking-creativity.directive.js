"use strict";

(function () {
    angular.module('proftestApp.test')
        .directive('thinkingCreativity', () => {

            return {
                restrict: 'E',
                templateUrl: 'components/tests/thinking-creativity/thinking-creativity.html',
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

            vm.nextQuestion();

            if (!vm.getCurrentQuestion()) {
                User.putMyAnswers({}, {
                    testId: vm.id,
                    answers: answers
                }).$promise.then((resp) => {
					var thinkingTypes, creativity, result;

                    localStorageService.remove(questionIndexKey);

					thinkingTypes = resp.result.map((item, index) => {
						item.type = vm.data.thinkingTypes[index];
						item.description = vm.data.description[index];
						item.level = vm.data.levels[item.level];
						return item;
					});
					creativity = thinkingTypes.pop();
					thinkingTypes.sort((a, b) => a.score < b.score);

					result = {
						creativity,
						thinkingTypes
					};

					localStorageService.set(resultKey, JSON.stringify(result));
					$location.url('/result/' + Auth.getCurrentUser()._id + '/' + vm.id);
                })
            }
        };
    }
})();

