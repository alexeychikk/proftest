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
                            $scope.vm.type = type;
                        }
                    });
                },
                controller: controller
            };
        });

    controller.$inject = ['$scope', 'User', 'Test', '$routeParams', 'localStorageService'];
    function controller($scope, User, Test, $routeParams, localStorageService) {
        let vm = this,
            testKey = $routeParams.testId,
            resultKey = testKey + 'result';

        vm.answers = JSON.parse(localStorageService.get(testKey));
        vm.result = {};

        if (vm.answers) {
            vm.result = JSON.parse(localStorageService.get(resultKey));
            localStorageService.remove(testKey, resultKey);
        } else {
            vm.admin = true;
            User.get({
                id: $routeParams.userId,
                fields: {firstName: true, lastName: true, tests: true}
            }, (resp) => {
                var test = resp.tests.find((item) => item._id == testKey);
                parseResultAsync(test.result || test.answers, vm.type).then((result) => {
                    vm.result = result;
                });
                vm.answers = test.result ? test.answers : undefined;
                vm.name = resp.lastName + ' ' + resp.firstName;
                vm.passingDate = test.passingDate;
            });
        }

        function parseResultAsync(result, type) {
            return Test.get({id: testKey, fields: {content: true}})
                .$promise.then((resp) => {
                    switch (type) {
                        case 'professional-readiness':
                            return result.likes.map((item) => {
                                return {
                                    name: resp.content.likes[item],
                                    description: resp.content.description[item]
                                }
                            });
                        case 'psychogeometrical':
                            return result.map((item) => {
                                return {
                                    figure: item,
                                    description: resp.content.description[item]
                                }
                            });
                        case 'profession-choice':
                            return {
                                professions: result.result
                                    .filter((item, index, array) => item.count === array[0].count || item.count === array[1].count)
                                    .map((item) => resp.content.professions[item.index]),
                                skills: Object.keys(result.skills).map((item) => resp.content.skills[item - 1]),
                                interests: Object.keys(result.interests).map((item) => resp.content.interests[item - 1])
                            };
                        case 'teenage-kettel':
                            var temp = result;
                            for (let prop in temp) {
                                let item = temp[prop];
                                item.name = resp.content.factors[prop].name;
                                item.description = resp.content.factors[prop][item.level];
                                item.level = item.level === 'high' ? 'высокий' : 'низкий';
                            }
                            return temp;
                        case 'thinking-creativity':
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
