"use strict";

(function () {
    angular.module('proftestApp.test')
        .directive('professionalReadiness', () => {

            return {
                restrict: 'E',
                templateUrl: 'components/tests/professional-readiness/professional-readiness.html',
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

    controller.$inject = ['$scope', 'User', 'localStorageService'];
    function controller($scope, User, localStorageService) {
        let vm = this,
            testKey = vm.id,
            statementIndexKey = testKey + 'questionIndex',
            answers = JSON.parse(localStorageService.get(testKey)) || [];

        vm.index.currentQuestionIndex = +localStorageService.get(statementIndexKey) || 0;

        vm.getCurrentStatement = () => vm.data.statement[vm.index.currentQuestionIndex];

        vm.nextQuestion = () => {
            vm.index.currentQuestionIndex++;
            localStorageService.set(statementIndexKey, vm.index.currentQuestionIndex);
            return vm.index.currentQuestionIndex;
        };

        vm.prevQuestion = () => {
            vm.index.currentQuestionIndex--;
            localStorageService.set(statementIndexKey, vm.index.currentQuestionIndex);
            return vm.index.currentQuestionIndex;
        };

        vm.answer = (values) => {
            answers.push(angular.copy(values));

			vm.nextQuestion();
			localStorageService.set(testKey, JSON.stringify(answers));

            if (!vm.getCurrentStatement()) {
                User.putMyAnswers({}, {
                    testId: vm.id,
                    answers: answers
                }).$promise.then((resp) => {
                    //localStorageService.remove(testKey, statementIndexKey);
                    vm.result = resp.result.likes.map((item) => {
                        return {
                            name: vm.data.likes[item],
                            description: vm.data.description[item]
                        }
                    });
                })
            }
        };
    }
})();
