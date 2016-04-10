"use strict";

(function () {
    angular.module('proftestApp.test')
        .directive('testResult', () => {

            return {
                restrict: 'E',
                template: '<div ng-include="contentUrl"></div>',
                controllerAs: 'vm',
                bindToController: true,
                link: function ($scope, $element, $attrs) {
                    $attrs.$observe('type', (type) => {
                        if (type) {
                            $scope.contentUrl = 'components/tests-results/' + type + '-result.html';
                        }
                    });
                },
                controller: controller
            };
        });

    controller.$inject = ['$scope', 'User', 'Auth', 'Test', '$routeParams', 'localStorageService', 'appConfig'];
    function controller($scope, User, Auth, Test, $routeParams, localStorageService, appConfig) {
        let testKey = $routeParams.testId,
            resultKey = testKey + 'result',
            testTypes = appConfig.testTypes;

        this.answers = JSON.parse(localStorageService.get(testKey));
        this.result = {};

        if (this.answers) {
            this.result = JSON.parse(localStorageService.get(resultKey));
            localStorageService.remove(testKey, resultKey);
        } else {
            this.admin = Auth.getCurrentUser()._id !== $routeParams.userId;
            User.get({
                id: $routeParams.userId,
                fields: {firstName: true, lastName: true, tests: true}
            }, (resp) => {
                var test = resp.tests.find((item) => item._id == testKey);
                parseResultAsync(test.result || test.answers).then((result) => {
                    this.result = result;
                });
                this.answers = test.result ? test.answers : undefined;
                this.name = resp.lastName + ' ' + resp.firstName;
                this.passingDate = test.passingDate;
            });
        }

        function parseResultAsync(result) {
            return Test.get({id: testKey, fields: {content: true, type: true}})
                .$promise.then((resp) => {
                    switch (resp.type) {
                        case testTypes.PROF_READINESS:
                            return result.likes.map((item) => {
                                return {
                                    name: resp.content.likes[item],
                                    description: resp.content.description[item]
                                }
                            });
                        case testTypes.PSYCHOGEOMETRICAL:
                            return result.map((item) => {
                                return {
                                    figure: item,
                                    description: resp.content.description[item]
                                }
                            });
                        case testTypes.SYSTEM_PROF_CHOICE:
                            return {
                                professions: result.result
                                    .filter((item, index, array) => item.count === array[0].count || item.count === array[1].count)
                                    .map((item) => resp.content.professions[item.index]),
                                skills: Object.keys(result.skills).map((item) => resp.content.skills[item - 1]),
                                interests: Object.keys(result.interests).map((item) => resp.content.interests[item - 1])
                            };
                        case testTypes.TEENAGE_KETTEL:
                            var temp = result;
                            for (let prop in temp) {
                                let item = temp[prop];
                                item.name = resp.content.factors[prop].name;
                                item.description = resp.content.factors[prop][item.level];
                                item.level = item.level === 'high' ? 'высокий' : 'низкий';
                            }
                            return temp;
                        case testTypes.THINKING_CREATIVITY:
                            var thinkingTypes, creativity;

                            thinkingTypes = result.result.map((item, index) => {
                                item.type = resp.content.thinkingTypes[index];
                                item.description = resp.content.description[index];
                                item.level = resp.content.levels[item.level];
                                return item;
                            });
                            creativity = thinkingTypes.pop();
                            thinkingTypes.sort((a, b) => a.score < b.score);

                            return {
                                creativity,
                                thinkingTypes
                            };
                    }
                });
        }
    }
})();
