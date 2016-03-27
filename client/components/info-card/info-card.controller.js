"use strict";

(function () {

	class InfoCardController {
		constructor($scope) {
			this.ownProfile = $scope.ownProfile;
			this.onEdit = $scope.onEdit;
			this.onSave = $scope.onSave;
			this.onCancel = $scope.onCancel;
		}

		edit() {
			this.editing = true;
			this.onEdit && this.onEdit();
		}

		save() {
			this.editing = false;
			this.onSave && this.onSave();
		}

		cancel() {
			this.editing = false;
			this.onCancel && this.onCancel();
		}
	}

	angular.module('proftestApp')
		.controller('InfoCardController', InfoCardController);

})();
