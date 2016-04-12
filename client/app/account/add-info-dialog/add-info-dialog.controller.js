"use strict";

(function () {

	class AddInfoDialogController {
		constructor($scope, $mdDialog, user) {
			$scope.buttons = [];
			//if (!user.gender && !user.birthday) $scope.buttons.push({name: 'Общие сведения', answer: 'general'});
			//if (!user.city && !user.country) $scope.buttons.push({name: 'Место проживания', answer: 'location'});
			if (!(user.education && user.education.length)) $scope.buttons.push({name: 'Образование', answer: 'education'});
			if (!(user.work && user.work.length)) $scope.buttons.push({name: 'Работа', answer: 'work'});
			$scope.answer = function(answer) {
				$mdDialog.hide(answer);
			};
		}
	}

	angular.module('proftestApp.account')
		.controller('AddInfoDialogController', AddInfoDialogController);

})();
