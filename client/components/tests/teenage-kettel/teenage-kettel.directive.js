"use strict";

(function () {
	angular.module('proftestApp.test')
		.directive('teenageKettel',
			['User', 'localStorageService', '$route', (User, localStorageService, $route) => {

				return {
					restrict: 'E',
					scope: {
						id: '@testId',
						data: '=data'
					},
					controller: ($scope, element, attrs) => {
						let testKey = $scope.id,
							questionIndexKey = 'questionIndex',
							answers = JSON.parse(localStorageService.get(testKey)) || [];

						$scope.currentQuestionIndex = +localStorageService.get(questionIndexKey) || 0;
						$route.updateParams({ question: $scope.currentQuestionIndex });

						$scope.getCurrentQuestion = () => $scope.data.questions[$scope.currentQuestionIndex];

						$scope.nextQuestion = () => {
							$scope.currentQuestionIndex++;
							localStorageService.set(questionIndexKey, $scope.currentQuestionIndex);
							$route.updateParams({ question: $scope.currentQuestionIndex });
							return $scope.currentQuestionIndex;
						};

						$scope.prevQuestion = () => {
							$scope.currentQuestionIndex--;
							localStorageService.set(questionIndexKey, $scope.currentQuestionIndex);
							$route.updateParams({ question: $scope.currentQuestionIndex });
							return $scope.currentQuestionIndex;
						};

						$scope.answer = (value) => {
							answers[$scope.currentQuestionIndex] = value;
							localStorageService.set(testKey, JSON.stringify(answers));

							$scope.nextQuestion();

							if (!$scope.getCurrentQuestion()) {
								User.putMyAnswers({}, {
									testId: $scope.id,
									answers: answers
								}).$promise.then((resp) => {
									localStorageService.remove(testKey, questionIndexKey);
									$route.updateParams({
										question: 'result'
									});
									$scope.result = resp.data;
								})
							}
						};
					}
				};

			}]);

})();

