"use strict";

(function () {
    angular.module('proftestApp.test')
        .directive('professionChoice', () => {

            return {
                restrict: 'E',
                templateUrl: 'components/tests/profession-choice/profession-choice.html',
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
            categoryIndexKey = testKey + 'categoryIndex',
            answers = JSON.parse(localStorageService.get(testKey)) || {
                    interests: [],
                    skills: []
                };

        vm.currentCategoryIndex = +localStorageService.get(categoryIndexKey) || 0;
        vm.currentQuestionIndex = +localStorageService.get(questionIndexKey) || 0;

        vm.answersBlock = [];

        vm.getCurrentCategory = () => vm.data.categories[vm.currentCategoryIndex];
        vm.getCurrentQuestion = () => vm.getCurrentCategory().questions[vm.currentQuestionIndex];

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

        vm.getAnswers = () => {
            let answers = [];
            for (let key in vm.answersBlock) {
                if (vm.answersBlock[key]) answers.push(key);
            }
            return answers;
        };

        vm.answer = (values) => {
            if (vm.currentCategoryIndex === 0) {
                answers.interests[vm.currentQuestionIndex] = values;
            } else {
                answers.skills[vm.currentQuestionIndex] = values;
            }

            localStorageService.set(testKey, JSON.stringify(answers));

            vm.answersBlock = [];
            vm.nextQuestion();

            if (!vm.getCurrentQuestion()) {
                if (vm.currentCategoryIndex === 0) {
                    vm.currentCategoryIndex = 1;
                    vm.currentQuestionIndex = 0;
                    localStorageService.set(questionIndexKey, vm.currentQuestionIndex);
                    localStorageService.set(categoryIndexKey, vm.currentCategoryIndex);
                } else {
                    User.putMyAnswers({}, {
                        testId: vm.id,
                        answers: answers
                    }).$promise.then((resp) => {
                        localStorageService.remove(testKey, questionIndexKey, categoryIndexKey);
                        vm.result = resp.data;
                    })
                }
            }
        };
    }
})();
