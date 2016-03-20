"use strict";

(function () {

    class SignupController {
        //start-non-standard
        user = {};
        errors = {};
        submitted = false;
        //end-non-standard

        constructor(Auth, $location) {
            this.Auth = Auth;
            this.$location = $location;
        }

        register(form) {
            this.submitted = true;

            if (form.$valid) {
                this.Auth.createUser(this.user)
                    .then(() => {
                        // Account created, redirect to home
                        this.$location.path('/');
                    })
                    .catch(err => {
                        err = err.data;
                        this.errors = {};

                        // Update validity of form fields that match the mongoose errors
                        angular.forEach(err.errors, (error, field) => {
                            form[field].$setValidity('mongoose', false);
                            this.errors[field] = error.message;
                        });
                    });
            }
        }
    }

    angular.module('proftestApp.account')
        .controller('SignupController', SignupController);

})();
