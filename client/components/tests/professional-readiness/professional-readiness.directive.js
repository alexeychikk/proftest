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

    controller.$inject = ['$scope', 'User', 'localStorageService', 'appConfig'];
    function controller($scope, User, localStorageService, appConfig) {
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

        vm.answer = (type, value) => {
            answers[vm.index.currentQuestionIndex] = answers[vm.index.currentQuestionIndex] || {};
            answers[vm.index.currentQuestionIndex][type] = value;

            if (Object.keys(answers[vm.index.currentQuestionIndex]).length === 3) {
                vm.nextQuestion();
                localStorageService.set(testKey, JSON.stringify(answers));
            }

            if (!vm.getCurrentStatement()) {
                User.putMyAnswers({}, {
                    testId: vm.id,
                    answers: answers
                }).$promise.then((resp) => {
                    localStorageService.remove(testKey, statementIndexKey);
                    vm.result = resp.data;
                })
            }
        };
    }
})();
