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
				icon: '@',
				name: '@',
				ownProfile: '=?',
				onEdit: '&?',
				onSave: '&?',
				onCancel: '&?',
				canEdit: '@?',
				editing: '=?'
			},
			transclude: true,
			link: function(scope, el, attrs, ctrl, transclude) {
				el.append(transclude());
			}
		}));

})();
