"use strict";

(function () {

    angular.module('proftestApp')
        .run(($rootScope) => {
            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                if (next.name === 'logout' && current && current.originalPath && !current.authenticate) {
                    next.referrer = current.originalPath;
                }
            });
        });

})();
