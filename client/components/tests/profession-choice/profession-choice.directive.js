"use strict";

(function () {
    angular.module('proftestApp.test')
        .directive('professionChoice', () => {

            return {
                restrict: 'E',
                templateUrl: 'components/tests/profession-choice/profession-choice.html',
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
            categoryIndexKey = testKey + 'categoryIndex',
            answers = JSON.parse(localStorageService.get(testKey)) || {
                    interests: [],
                    skills: []
                };

        vm.index.currentCategoryIndex = +localStorageService.get(categoryIndexKey) || 0;
        vm.index.currentQuestionIndex = +localStorageService.get(questionIndexKey) || 0;

        vm.answersBlock = [];

        vm.getCurrentCategory = () => vm.data.categories[vm.index.currentCategoryIndex];
        vm.getCurrentQuestion = () => vm.getCurrentCategory().questions[vm.index.currentQuestionIndex];

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

        vm.getAnswers = () => {
            let answers = [];
            for (let key in vm.answersBlock) {
                if (vm.answersBlock[key]) answers.push(key);
            }
            return answers;
        };

        vm.answer = (values) => {
            if (vm.index.currentCategoryIndex === 0) {
                answers.interests[vm.index.currentQuestionIndex] = values;
            } else {
                answers.skills[vm.index.currentQuestionIndex] = values;
            }

            localStorageService.set(testKey, JSON.stringify(answers));

            vm.answersBlock = [];
            vm.nextQuestion();

            if (!vm.getCurrentQuestion()) {
                if (vm.index.currentCategoryIndex === 0) {
                    vm.index.currentCategoryIndex = 1;
                    vm.index.currentQuestionIndex = 0;
                    localStorageService.set(questionIndexKey, vm.index.currentQuestionIndex);
                    localStorageService.set(categoryIndexKey, vm.index.currentCategoryIndex);
                } else {
                    User.putMyAnswers({}, {
                        testId: vm.id,
                        answers: answers
                    }).$promise.then((resp) => {
                        localStorageService.remove(testKey, questionIndexKey, categoryIndexKey, 'countersSum');
                        vm.result = {
                            professions: resp.result
                                .filter((item, index, array) => item.count === array[0].count || item.count === array[1].count)
                                .map((item) => vm.data.professions[item.index]),
                            skills: Object.keys(resp.skills).map((item) => vm.data.skills[item - 1]),
                            interests: Object.keys(resp.interests).map((item) => vm.data.interests[item - 1])
                        };

                    })
                }
            }
        };
    }
})();
