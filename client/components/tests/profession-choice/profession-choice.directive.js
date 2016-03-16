"use strict";

(function () {
    angular.module('proftestApp.test')
        .directive('professionChoice', 'User', (User) => {

            return {
                restrict: 'E',
                scope: {
                    data: '=data'
                },
                link: ($scope, element, attrs) => {
                    $scope.currentCategoryIndex = 0;
                    $scope.currentQuestionIndex = 0;
                    $scope.answersBlock = [];
                },
                controller: ($scope, element, attrs) => {
                    let answers = {
                        interests: [],
                        skills: []
                    };

                    $scope.getCurrentCategory = () => $scope.data.categories[$scope.currentCategoryIndex];
                    $scope.getCurrentQuestion = () => $scope.getCurrentCategory().questions[$scope.currentQuestionIndex];

                    $scope.nextQuestion = () => $scope.currentQuestionIndex++;
                    $scope.prevQuestion = () => $scope.currentQuestionIndex--;

                    $scope.getAnswers = () => {
                        let answers = [];
                        for (let key in $scope.answersBlock) {
                            if ($scope.answersBlock[key]) answers.push(key);
                        }
                        return answers;
                    };

                    $scope.answer = (values) => {
                        if ($scope.currentCategoryIndex === 0) {
                            answers.interests[$scope.currentQuestionIndex] = values;
                        } else {
                            answers.skills[$scope.currentQuestionIndex] = values;
                        }

                        $scope.currentQuestionIndex++;

                        if (!$scope.getCurrentQuestion() && $scope.currentCategoryIndex === 0) {
                            $scope.currentCategoryIndex = 1;
                            $scope.currentQuestionIndex = 0;
                        } else {
                            User.putMyAnswers({}, {
                                testId: $scope.id,
                                answers: answers
                            }).$promise.then((resp) => {
                                $scope.result = resp.data;
                            })
                        }
                    };
                }
            };

        });

})();

