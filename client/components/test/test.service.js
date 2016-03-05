(function () {

    angular.module('proftestApp')
        .factory('Test', TestResource);

    function TestResource($resource) {

        return $resource('/api/tests/:id/:controller', {
            id: '@_id'
        }, {
            getStats: {
                method: 'GET',
                params: {
                    controller: 'stats'
                }
            }
        });

    }

})();
