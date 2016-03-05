(function () {

    class NavbarController {

        constructor($location, Auth) {
            this.$location = $location;
            this.isLoggedIn = Auth.isLoggedIn;
            this.isAdmin = Auth.isAdmin;
            this.getCurrentUser = Auth.getCurrentUser;
        }

    }

    angular.module('proftestApp')
        .controller('NavbarController', NavbarController);

})();
