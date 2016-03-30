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
	}

	angular.module('proftestApp.test')
		.controller('ResultController', ResultController);

})();
