(function () {

    angular.module('proftestApp')
        .controller('OauthButtonsCtrl', function ($window) {
            this.loginOauth = (provider) => {
                $window.location.href = '/auth/' + provider;
            };
        });

})();
