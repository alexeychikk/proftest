"use strict";

(function () {

    class MainController {

        constructor(Test) {
            this.Test = Test;
            this.testsShort = {};

            this.Test.query({
                params: {fields: '_id name icon type shortDesc'}
            }).$promise.then(response => {
                this.testsShort = response.data;
            });
        }
    }

    angular.module('proftestApp')
        .controller('MainController', MainController);

})();
