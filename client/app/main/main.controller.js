'use strict';

(function () {

    class MainController {

        constructor($http) {
            this.$http = $http;
            this.awesomeTests = [];

            $http.get('/api/tests').then(response => {
                this.awesomeTests = response.data;
            });
        }

        addTest() {
            if (this.newTest) {
                this.$http.post('/api/tests', {name: this.newTest});
                this.newTest = '';
            }
        }

        deleteTest(test) {
            this.$http.delete('/api/tests/' + test._id);
        }
    }

    angular.module('proftestApp')
        .controller('MainController', MainController);

})();
