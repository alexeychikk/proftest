"use strict";

(function () {

    angular.module('proftestApp')
        .directive('myFooter', () => {
            return {
                templateUrl: 'components/footer/footer.html',
                restrict: 'E',
                replace: true,
                link: (scope, element) => {
                    element.addClass('footer hidden');
                    scope.date = new Date();
					var show = false;

					function setShow() {
						show = document.body.offsetHeight + document.body.scrollTop + 36 >= document.body.scrollHeight;
						if (scope.show != show)
							show ? element.removeClass('hidden') : element.addClass('hidden');
						scope.show = show;
					}

					setInterval(function() {
						setShow();
					}, 35);
                }
            };
        });

})();

