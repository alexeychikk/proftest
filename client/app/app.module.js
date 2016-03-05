(function () {

    angular.module('proftestApp', [
        'proftestApp.auth',
        'proftestApp.account',
        'proftestApp.admin',
        'proftestApp.constants',
        'proftestApp.test',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'validation.match'
    ]);

})();
