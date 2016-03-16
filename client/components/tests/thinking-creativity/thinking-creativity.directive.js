"use strict";

(function () {
    angular.module('proftestApp.test')
        .directive('thinkingCreativity', 'User', (User) => {

            return {
                restrict: 'E',
                templateUrl: 'thinking-creativity.html',
                scope: {
                    id: '@testId',
                    data: '=data'
                },
                controllerAs: 'vm',
                link: ($scope, element, attrs) => {
                    $scope.currentQuestionIndex = 0;
                },
                controller : ($scope, element, attrs) => {
                    let answers = [];

                    $scope.getCurrentQuestion = () => $scope.data.questions[$scope.currentQuestionIndex];

                    $scope.nextQuestion = () => $scope.currentQuestionIndex++;
                    $scope.prevQuestion = () => $scope.currentQuestionIndex--;

                    $scope.answer = (value) => {
                        answers[$scope.currentQuestionIndex] = value;
                        $scope.currentQuestionIndex++;
                        if (!$scope.getCurrentQuestion()) {
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

