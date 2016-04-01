"use strict";

(function () {

	class ResultController {

		constructor($routeParams, Test, appConfig) {
			this.Test = Test;
			this.$routeParams = $routeParams;
			this.testTypes = appConfig.testTypes;
			this.test = {
				_id: this.$routeParams.testId
			};

			this.Test.get({
				id: this.test._id,
				fields: { type: true }
			}).$promise.then(response => {
				this.test.type = response.type;
			});
		}

		getTestType(type) {
			switch (type) {
				case this.testTypes.PROF_READINESS: return 'professional-readiness';
				case this.testTypes.PSYCHOGEOMETRICAL: return 'psychogeometrical';
				case this.testTypes.SYSTEM_PROF_CHOICE: return 'profession-choice';
				case this.testTypes.TEENAGE_KETTEL: return 'teenage-kettel';
				case this.testTypes.THINKING_CREATIVITY: return 'thinking-creativity';
			}
		}
	}

	angular.module('proftestApp.test')
		.controller('ResultController', ResultController);

})();
