"use strict";

(function () {

	class InfoCardController {
		constructor($scope) {
			this.canEdit = $scope.canEdit != undefined;
			this.ownProfile = $scope.ownProfile;
			this.onEdit = $scope.onEdit;
			this.onSave = $scope.onSave;
			this.onCancel = $scope.onCancel;

			$scope.$watch('editing', val => { this.editing = val });
		}

		edit() {
			this.editing = true;
			this.onEdit && this.onEdit();
		}

		save() {
			this.onSave && this.onSave().then(res => this.editing = !res);
		}

		cancel() {
			this.editing = false;
			this.onCancel && this.onCancel();
		}
	}

	angular.module('proftestApp')
		.controller('InfoCardController', InfoCardController);

})();
