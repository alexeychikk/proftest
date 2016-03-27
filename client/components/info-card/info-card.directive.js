"use strict";

(function () {

	angular.module('proftestApp')
		.directive('infoCard', () => ({
			templateUrl: 'components/info-card/info-card.html',
			restrict: 'E',
			replace: true,
			controller: 'InfoCardController',
			controllerAs: 'inf',
			scope: {
				ownProfile: '@?',
				onEdit: '&?',
				onSave: '&?',
				onCancel: '&?'
			},
			transclude: true,
			link: function(scope, el, attrs, ctrl, transclude) {
				el.append(transclude());
			}
		}));

})();
