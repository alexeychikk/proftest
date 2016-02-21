'use strict';

(function () {

  /**
   * Removes server error when user updates input
   */
  angular.module('proftestApp')
    .directive('mongooseError', () => {

      return {
        restrict: 'A',
        require: 'ngModel',
        link: (scope, element, attrs, ngModel) => {
          element.on('keydown', () => ngModel.$setValidity('mongoose', true));
        }
      };

    });

})();

