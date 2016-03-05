(function () {

    angular.module('proftestApp.auth')
        .factory('User', UserResource);

    function UserResource($resource) {

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
            }
        });

    }

})();
