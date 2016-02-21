'use strict';

(function () {

  angular.module('proftestApp')
    .directive('footer', () => {

      return {
        templateUrl: 'components/footer/footer.html',
        restrict: 'E',
        link: (scope, element) => {
          element.addClass('footer');
        }
      };

    });

})();

