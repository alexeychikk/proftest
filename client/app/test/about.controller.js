"use strict";

(function () {

    class AboutController {

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
                fields: {name: true, icon: true, type: true, longDesc: true, instruction: true}
            }).$promise.then(response => {
                this.test.name = response.name;
                this.test.icon = response.icon;
                this.test.type = response.type;
                this.test.longDesc = 'sssssssssssssssssssgdf dsfgsdfg sdfg sdf gsdfgsdfg sdfg sssssssssssssssssssgdf dsfgsdfg sdfg sdf gsdfgsdfg sdfg fsdgsdfg sdfgsdfgsdfg s dsfgs fsdgsdfg sdfgsdfgsdfg s dsfgs sssssssssssssssssssgdf dsfgsdfg sdfg sdf gsdfgsdfg sdfg fsdgsdfg sdfgsdfgsdfg s dsfgs sssssssssssssssssssgdf dsfgsdfg sdfg sdf gsdfgsdfg sdfg fsdgsdfg sdfgsdfgsdfg s dsfgs sssssssssssssssssssgdf dsfgsdfg sdfg sdf gsdfgsdfg sdfg fsdgsdfg sdfgsdfgsdfg s dsfgs sssssssssssssssssssgdf dsfgsdfg sdfg sdf gsdfgsdfg sdfg fsdgsdfg sdfgsdfgsdfg s dsfgs sssssssssssssssssssgdf dsfgsdfg sdfg sdf gsdfgsdfg sdfg fsdgsdfg sdfgsdfgsdfg s dsfgs sssssssssssssssssssgdf dsfgsdfg sdfg sdf sssssssssssssssssssgdf dsfgsdfg sdfg sdf gsdfgsdfg sdfg fsdgsdfg sdfgsdfgsdfg s dsfgs sssssssssssssssssssgdf dsfgsdfg sdfg sdf gsdfgsdfg sdfg fsdgsdfg sdfgsdfgsdfg s dsfgs gsdfgsdfg sdfg fsdgsdfg sdfgsdfgsdfg s dsfgs';
                this.test.instruction = response.instruction;

                localStorageService.remove(this.$routeParams.id, this.$routeParams.id + 'questionIndex',
                    this.$routeParams.id + 'categoryIndex', 'countersSum');
            });
        }
    }

    angular.module('proftestApp.test')
        .controller('AboutController', AboutController);

})();
