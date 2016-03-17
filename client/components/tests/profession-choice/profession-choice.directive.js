"use strict";

(function () {
	angular.module('proftestApp.test')
		.directive('professionChoice',
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
							categoryIndexKey = 'categoryIndex',
							answers = JSON.parse(localStorageService.get(testKey)) || {
									interests: [],
									skills: []
								};

						$scope.currentCategoryIndex = +localStorageService.get(categoryIndexKey) || 0;
						$scope.currentQuestionIndex = +localStorageService.get(questionIndexKey) || 0;
						$route.updateParams({
							category: $scope.currentCategoryIndex,
							question: $scope.currentQuestionIndex
						});

						$scope.answersBlock = [];

						$scope.getCurrentCategory = () => $scope.data.categories[$scope.currentCategoryIndex];
						$scope.getCurrentQuestion = () => $scope.getCurrentCategory().questions[$scope.currentQuestionIndex];

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

							localStorageService.set(testKey, JSON.stringify(answers));

							$scope.nextQuestion();

							if (!$scope.getCurrentQuestion() && $scope.currentCategoryIndex === 0) {
								$scope.currentCategoryIndex = 1;
								$scope.currentQuestionIndex = 0;
								localStorageService.set(questionIndexKey, $scope.currentQuestionIndex);
								localStorageService.set(categoryIndexKey, $scope.currentCategoryIndex);
								$route.updateParams({
									category: $scope.currentCategoryIndex,
									question: $scope.currentQuestionIndex
								});
							} else {
								User.putMyAnswers({}, {
									testId: $scope.id,
									answers: answers
								}).$promise.then((resp) => {
									localStorageService.remove(testKey, questionIndexKey, categoryIndexKey);
									$route.updateParams({
										category: 'result',
										question: undefined
									});
									$scope.result = resp.data;
								})
							}
						};
					}
				};

			}]);
})();
