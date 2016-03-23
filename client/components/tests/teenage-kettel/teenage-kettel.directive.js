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

    controller.$inject = ['$scope', 'User', 'localStorageService'];
    function controller($scope, User, localStorageService) {
        let vm = this,
            testKey = vm.id,
            questionIndexKey = testKey + 'questionIndex',
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
                    localStorageService.remove(testKey, questionIndexKey);
                    vm.result = resp;
                })
            }
        };
    }
})();
