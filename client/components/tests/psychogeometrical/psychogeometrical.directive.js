"use strict";

(function () {
    angular.module('proftestApp.test')
        .directive('psychogeometrical', ['User', (User) => {

            return {
                restrict: 'E',
                scope: {
                    id: '@testId',
                    data: '=data'
                },
                link: (scope, element, attrs) => {

                }
            };

        }]);

})();

