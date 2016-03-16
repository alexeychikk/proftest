"use strict";

(function () {

    class TestController {

        constructor($location, $routeParams, Test, appConfig) {
            this.Test = Test;
            this.$location = $location;
            this.$routeParams = $routeParams;
            this.testTypes = appConfig.testTypes;
            this.test = {};

            this.Test.query({
                id: this.$routeParams.id,
                fields: { name: true, icon: true, type: true, longDesc: true, instruction: true }
            }).$promise.then(response => {
                this.test.name = response.data.name;
                this.test.icon = response.data.icon;
                this.test.type = response.data.type;
                this.test.longDesc = response.data.longDesc;
                this.test.instruction = response.data.instruction;
            });

            this.Test.get({
                id: this.$routeParams.id,
                fields: { content: true }
            }).$promise.then(response => {
                this.test.content = response.data.content;
            });
        }
    }

    angular.module('proftestApp')
        .controller('TestController', TestController);

})();
