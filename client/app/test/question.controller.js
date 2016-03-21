"use strict";

(function () {

	class QuestionController {

		constructor($routeParams, Test, appConfig) {
			this.Test = Test;
			this.$routeParams = $routeParams;
			this.testTypes = appConfig.testTypes;
			this.test = {
				_id: this.$routeParams.id
			};
			this.progress = {
				currentQuestionIndex: 0,
				currentCategoryIndex: 0,
				questionsCount: 0
			};

			this.Test.get({
				id: this.$routeParams.id,
				fields: { content: true, type: true }
			}).$promise.then(response => {
				this.test.type = response.type;
				this.test.content = response.content;

				if (this.test.content.questions || this.test.content.statement) {
					this.progress.questionsCount =
						this.test.content.statement
							? this.test.content.statement.length
							: this.test.content.questions.length;
				} else if (this.test.content.categories) {
					for (let category of this.test.content.categories) {
						this.progress.questionsCount += category.questions.length;
					}
				} else {
					this.progress.questionsCount = 0;
				}
			});
		}
	}

	angular.module('proftestApp.test')
		.controller('QuestionController', QuestionController);

})();
