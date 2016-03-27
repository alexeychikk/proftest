"use strict";

(function () {
	angular.module('proftestApp')
		.filter('gender', gender);

	function gender() {
		return function (input) {
			return input == 'M' ? 'Мужской': 'Женский';
		};
	}
})();
