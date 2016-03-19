"use strict";

(function () {
    angular.module('proftestApp.test')
        .directive('professionalReadiness', () => {

            return {
                restrict: 'E',
                templateUrl: 'components/tests/professional-readiness/professional-readiness.html',
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
            statementIndexKey = testKey + 'questionIndex',
            answers = JSON.parse(localStorageService.get(testKey)) || [];

        vm.currentStatementIndex = +localStorageService.get(statementIndexKey) || 0;

        vm.getCurrentStatement = () => vm.data.statement[vm.currentStatementIndex];

        vm.nextQuestion = () => {
            vm.currentStatementIndex++;
            localStorageService.set(statementIndexKey, vm.currentStatementIndex);
            return vm.currentStatementIndex;
        };

        vm.prevQuestion = () => {
            vm.currentStatementIndex--;
            localStorageService.set(statementIndexKey, vm.currentStatementIndex);
            return vm.currentStatementIndex;
        };

        vm.answer = (type, value) => {
            answers[vm.currentStatementIndex] = answers[vm.currentStatementIndex] || {};
            answers[vm.currentStatementIndex][type] = value;

            if (Object.keys(answers[vm.currentStatementIndex]).length === 3) {
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
