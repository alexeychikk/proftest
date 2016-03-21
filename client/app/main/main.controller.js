"use strict";

(function () {

    class MainController {

        constructor(Test, $location, Auth, localStorageService) {
            this.Test = Test;
            this.$location = $location;
            this.getCurrentUser = Auth.getCurrentUser;
			this.localStorageService = localStorageService;
            this.testsShort = {};

            this.Test.query({
                fields: {name: true, icon: true, type: true, shortDesc: true, longDesc: true, instruction: true}
            }).$promise.then(response => {
                this.testsShort = response;
            });

            this.isTestPassed = (id) => !!this.getCurrentUser().tests.find((test) => id === test._id);

			this.localStorageService.clearAll();
        }
    }

    angular.module('proftestApp')
        .controller('MainController', MainController);

})();
