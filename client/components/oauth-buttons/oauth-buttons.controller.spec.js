"use strict";

(function () {

    describe('Controller: OauthButtonsCtrl', () => {

        // load the controller's module
        beforeEach(module('proftestApp'));

        var OauthButtonsCtrl, $window;

        // Initialize the controller and a mock $window
        beforeEach(inject(($controller) => {
            $window = {
                location: {}
            };

            OauthButtonsCtrl = $controller('OauthButtonsCtrl', {
                $window: $window
            });
        }));

        it('should attach loginOauth', () => {
            expect(OauthButtonsCtrl.loginOauth).toEqual(jasmine.any(Function));
        });
    });

})();
