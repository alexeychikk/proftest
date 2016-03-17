"use strict";

(function () {

    class MainController {

        constructor(Test) {
            this.Test = Test;
            this.testsShort = {};

            this.Test.query({
                fields: {name: true, icon: true, type: true, shortDesc: true}
            }).$promise.then(response => {
                this.testsShort = response;
            });
        }
    }

    angular.module('proftestApp')
        .controller('MainController', MainController);

})();
