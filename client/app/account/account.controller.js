"use strict";

(function () {

    class AccountController {

        constructor(Auth) {
            this.isAdmin = Auth.isAdmin;
            this.getCurrentUser = Auth.getCurrentUser;
        }
    }

    angular.module('proftestApp.account')
        .controller('AccountController', AccountController);

})();
