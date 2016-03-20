"use strict";

(function () {

    angular.module('proftestApp.auth')
        .factory('User', UserResource);

    function UserResource($resource, $rootScope) {

        return $resource('/api/users/:id/:controller', {
            id: '@_id'
        }, {
            changePassword: {
                method: 'PUT',
                params: {
                    controller: 'password'
                }
            },
            putAnswers: {
                method: 'PUT',
                params: {
                    controller: 'answers'
                }
            },
            putMyAnswers: {
                method: 'PUT',
                params: {
                    id: 'me',
                    controller: 'answers'
                },
                interceptor: {
                    response: (config) => $rootScope.currentUser = config.data
                }
            },
            getStats: {
                method: 'GET',
                params: {
                    id: 'stats'
                }
            },
            get: {
                method: 'GET',
                params: {
                    id: 'me'
                }
            },
            getOne: {
                method: 'GET'
            }
        });

    }

})();
