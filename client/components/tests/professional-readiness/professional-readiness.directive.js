"use strict";

(function () {
    angular.module('proftestApp.test')
        .directive('professionalReadiness', 'User', (User) => {

            return {
                restrict: 'E',
                scope: {
                    id: '@testId',
                    data: '=data'
                },
                link: ($scope, element, attrs) => {
                    $scope.currentStatementIndex = 0;
                },
                controller : ($scope, element, attrs) => {
                    let answers = [];

                    $scope.getCurrentStatement = () => $scope.data.statement[$scope.currentStatementIndex];

                    $scope.nextStatement = () => $scope.currentStatementIndex++;
                    $scope.prevStatement = () => $scope.currentStatementIndex--;

                    $scope.answer = (questionIndex, value) => {
                        if (!questionIndex) answers[$scope.currentQuestionIndex] = {};
                        answers[$scope.currentQuestionIndex][$scope.data.questions[questionIndex].type] = value;
                        $scope.currentQuestionIndex++;

                        if (!$scope.getCurrentStatement()) {
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

