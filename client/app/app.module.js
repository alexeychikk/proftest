(function () {

    angular.module('proftestApp', [
        'proftestApp.auth',
        'proftestApp.account',
        'proftestApp.admin',
        'proftestApp.constants',
        'proftestApp.test',
        'ngMaterial',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'validation.match'
    ]);

})();
