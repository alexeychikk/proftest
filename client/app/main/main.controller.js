"use strict";

(function () {

	class MainController {

		constructor(Test, $location, Auth, localStorageService) {
			this.Test = Test;
			this.$location = $location;
			this.localStorageService = localStorageService;
			this.testsShort = {};

			this.Test.query({
				fields: { name: true, icon: true, type: true, shortDesc: true, longDesc: true, instruction: true }
			}).$promise.then(response => {
				this.testsShort = response;
				Auth.getCurrentUser(_.noop).then(user => {
					this.user = user;
					for (let test of this.testsShort) {
						test.passed = !!user.tests.find((uTest) => uTest._id == test._id);
					}
				});
			});
		}
	}

	angular.module('proftestApp')
		.controller('MainController', MainController);

})();
