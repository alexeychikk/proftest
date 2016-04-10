"use strict";

(function () {

	angular.module('proftestApp')
		.directive('iconButton', () => ({
			templateUrl: 'components/icon-button/icon-button.html',
			restrict: 'E',
			scope: {
				icon: '@',
				tooltip: '@?',
				classSize: '@?',
				classList: '@?',
				tooltipDirection: '@?'
			}
		}));

})();
