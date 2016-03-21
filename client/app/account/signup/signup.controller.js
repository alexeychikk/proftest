"use strict";

(function () {

    class SignupController {
        //start-non-standard
        user = {};
        errors = {};
        submitted = false;
        //end-non-standard

        constructor(Auth, $location, Util, $scope, $http) {
            this.Auth = Auth;
            this.$location = $location;
			this.$http = $http;

			let parsedParams = Util.parseRouteParams($location.search());
			this.user = parsedParams.user || {};
			this.user.birthDate = this.user.birthDate && new Date(this.user.birthDate);
			delete this.user._id;
			this.errors = parsedParams.errors || {};

			if (parsedParams.errors) this.socialReg = true;
			var unwatch = $scope.$watch('form', form => {
				if (form) {
					for (let field in this.errors) {
						form[field].$setTouched(true);
						form[field].$setValidity(this.errors[field].kind, false);
						form[field].$setDirty(true);
					}
					this.form = form;
					unwatch();
				}
			});
        }

		catchFormErrors(err) {
			err = err.data;
			this.errors = {};

			// Update validity of form fields that match the mongoose errors
			angular.forEach(err.errors, (error, field) => {
				this.form[field].$setValidity('mongoose', false);
				this.errors[field] = error.message;
			});
		}

        register() {
            this.submitted = true;

            if (this.form.$valid) {
                this.Auth.createUser(this.user)
                    .then(() => {
                        // Account created, redirect to home
                        this.$location.path('/');
                    })
                    .catch(err => this.catchFormErrors(err));
            }
        }

		complete() {
			this.submitted = true;

			if (this.form.$valid) {
				this.Auth.completeProvider(this.user.provider, this.user)
					.then(() => {
						this.$location.search({});
						this.$location.path('/');
					})
					.catch(err => this.catchFormErrors(err));
			}
		}
    }

    angular.module('proftestApp.account')
        .controller('SignupController', SignupController);

})();
