"use strict";

(function () {

    angular.module('proftestApp')
        .directive('oauthButtons', () => {
            return {
                templateUrl: 'components/oauth-buttons/oauth-buttons.html',
                restrict: 'EA',
                controller: 'OauthButtonsCtrl',
                controllerAs: 'OauthButtons',
                scope: {
                    classes: '@'
                }
            };
        });

})();
