"use strict";

(function () {

    angular.module('proftestApp.auth')
        .run(($rootScope, $location, $route, Auth) => {

			function fuzzyRedirect(event, next, current) {
				return function(is) {
					if (is && next.authenticate || !(is || next.authenticate)) {
						return;
					}

					if (next.authenticate) {
						if (!current || current.authenticate || !current.controller) return $location.path('/login');

					}
					else if (next.authenticate === false) {
						if (!current) return $location.path('/');
					}

					event.preventDefault();
				};
			}

            // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
            $rootScope.$on('$routeChangeStart', (event, next, current) => {
                if (next.authenticate == null) {
                    return;
                }

                if (typeof next.authenticate === 'string') {
                    Auth.hasRole(next.authenticate, _.noop).then(has => {
                        if (has) {
                            return;
                        }

                        event.preventDefault();
                        return Auth.isLoggedIn(_.noop).then(is => {
                            $location.path(is ? '/' : '/login');
                        });
                    });
                } else {
					let is = Auth.isLoggedIn();
					if (!is && (!current || !current.controller)) Auth.isLoggedIn(_.noop)
						.then(fuzzyRedirect(event, next, current));
					else fuzzyRedirect(event, next, current)(is);
				}
            });
        });

})();
