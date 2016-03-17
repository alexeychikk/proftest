"use strict";

(function () {
	angular.module('proftestApp.test')
		.directive('professionalReadiness',
			['User', 'localStorageService', '$route', (User, localStorageService, $route) => {

				return {
					restrict: 'E',
					scope: {
						id: '@testId',
						data: '=data'
					},
					controller: ($scope, element, attrs) => {
						let testKey = $scope.id,
							statementIndexKey = 'questionIndex',
							answers = JSON.parse(localStorageService.get(testKey)) || [];

						$scope.currentStatementIndex = +localStorageService.get(statementIndexKey) || 0;
						$route.updateParams({ question: $scope.currentQuestionIndex });

						$scope.getCurrentStatement = () => $scope.data.statement[$scope.currentStatementIndex];

						$scope.nextQuestion = () => {
							$scope.currentStatementIndex++;
							localStorageService.set(statementIndexKey, $scope.currentStatementIndex);
							$route.updateParams({ question: $scope.currentQuestionIndex });
							return $scope.currentStatementIndex;
						};

						$scope.prevQuestion = () => {
							$scope.currentStatementIndex--;
							localStorageService.set(statementIndexKey, $scope.currentStatementIndex);
							$route.updateParams({ question: $scope.currentQuestionIndex });
							return $scope.currentStatementIndex;
						};

						$scope.answer = (type, value) => {
							answers[$scope.currentStatementIndex] = answers[$scope.currentStatementIndex] || {};
							answers[$scope.currentStatementIndex][type] = value;

							if (Object.keys(answers[$scope.currentStatementIndex]).length === 3) {
								$scope.nextQuestion();
								localStorageService.set(testKey, JSON.stringify(answers));
							}

							if (!$scope.getCurrentStatement()) {
								User.putMyAnswers({}, {
									testId: $scope.id,
									answers: answers
								}).$promise.then((resp) => {
									localStorageService.remove(testKey, statementIndexKey);
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

