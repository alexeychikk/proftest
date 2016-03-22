"use strict";

(function () {

	angular.module('proftestApp')
		.directive('respSides', () => ({
			template: `<div flex-gt-sm="15" flex-sm="10" hide-xs></div>`,
			replace: true,
			restrict: 'E'
		}));

})();
