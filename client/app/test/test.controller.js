"use strict";

(function () {

    class TestController {

        constructor($location, $routeParams, Test) {
            this.Test = Test;
            this.$location = $location;
            this.$routeParams = $routeParams;
            this.test = {};

            //this.Test.get({
            //    params: {
            //        id: this.$routeParams.id,
            //        fields: ['_id', 'name', 'icon', 'type', 'longDesc', 'instruction']
            //    }
            //}).$promise.then(response => {
            //    this.test.name = response.data.name;
            //    this.test.icon = response.data.icon;
            //    this.test.type = response.data.type;
            //    this.test.longDesc = response.data.longDesc;
            //    this.test.instruction = response.data.instruction;
            //});
            //
            //this.Test.get({
            //    params: {
            //        id: this.$routeParams.id,
            //        fields: ['content']
            //    }
            //}).$promise.then(response => {
            //    this.test.content = response.data.content;
            //});
        }
    }

    angular.module('proftestApp')
        .controller('TestController', TestController);

})();
