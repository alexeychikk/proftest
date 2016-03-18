"use strict";

(function () {

	class TestController {

		constructor($location, $routeParams, Test, appConfig, localStorageService) {
			this.Test = Test;
			this.$location = $location;
			this.$routeParams = $routeParams;
			this.testTypes = appConfig.testTypes;
			this.test = {
				_id: this.$routeParams.id
			};

			this.Test.get({
				id: this.$routeParams.id,
				fields: { name: true, icon: true, type: true, longDesc: true, instruction: true }
			}).$promise.then(response => {
				this.test.name = response.name;
				this.test.icon = response.icon;
				this.test.type = response.type;
				this.test.longDesc = response.longDesc;
				this.test.instruction = response.instruction;

				localStorageService.remove(this.$routeParams.id);
				localStorageService.remove(this.$routeParams.id + 'questionIndex');
				localStorageService.remove(this.$routeParams.id + 'categoryIndex');
			});
		}
	}

	angular.module('proftestApp.test')
		.controller('TestController', TestController);

})();
