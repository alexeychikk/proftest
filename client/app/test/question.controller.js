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

			this.Test.get({
				id: this.$routeParams.id,
				fields: { content: true, type: true }
			}).$promise.then(response => {
				this.test.type = response.type;
				this.test.content = response.content;
			});
		}
	}

	angular.module('proftestApp.test')
		.controller('QuestionController', QuestionController);

})();
