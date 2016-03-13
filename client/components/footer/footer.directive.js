"use strict";

(function () {

    angular.module('proftestApp')
        .directive('myFooter', () => {

            return {
                templateUrl: 'components/footer/footer.html',
                restrict: 'E',
                replace: true,
                link: (scope, element) => {
                    element.addClass('footer');
                    scope.date = new Date();
                }
            };

        });

})();

