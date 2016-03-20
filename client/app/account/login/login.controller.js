"use strict";

(function () {

    class LoginController {
        constructor(Auth, $location) {
            this.user = {};
            this.errors = {};
            this.submitted = false;

            this.Auth = Auth;
            this.$location = $location;
        }

        login(form) {
            this.submitted = true;

            if (form.$valid) {
                this.Auth.login({
                        email: this.user.email,
                        password: this.user.password
                    })
                    .then(() => {
                        // Logged in, redirect to home
                        this.$location.path('/');
                    })
                    .catch(err => {
						form[err.field].$setValidity('mongoose', false);
                        this.errors.other = err.message;
                    });
            }
        }
    }

    angular.module('proftestApp.account')
        .controller('LoginController', LoginController);

})();
