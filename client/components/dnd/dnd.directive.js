"use strict";

(function () {
	angular.module('proftestApp.test').directive('dnd', () => {

			return {
				restrict: 'A',
				scope: {
					data: '=data'
				},
				link: ($scope, $element, $attrs) => {
					let target = null;

					$element.on('dragstart', (e) => {
						target = angular.element(e.target.closest('[draggable]'));

						let children = $element[0].querySelectorAll('[draggable="true"]'),
							targetIndex = target.attr('index');


						for (let index in children) {
							if (children.hasOwnProperty(index)) {
								let child = angular.element(children[index]);
								child.on('dragenter', (e) => {
									angular.element(e.target.closest('[draggable]')).addClass('dragover')
								});
								child.on('dragleave', (e) => {
									angular.element(e.target.closest('[draggable]')).removeClass('dragover')
								});
								child.on('dragover', (e) => e.preventDefault && e.preventDefault());
							}
						}

						target.addClass('dragged');

						e.dataTransfer.effectAllowed = 'move';
						e.dataTransfer.setData('index', targetIndex);
					});

					$element.on('dragend', () => {
						target.removeClass('dragged');
						angular.element($element[0].querySelector('.dragover')).removeClass('dragover')
					});
					$element.on('drop', (e) => {
						e.preventDefault && e.preventDefault();

						let destIndex = angular.element(e.target.closest('[draggable]')).attr('index');
						swapArrayElem($scope.data, e.dataTransfer.getData('index'), destIndex);
						$scope.$apply();
					});

					function swapArrayElem(array, old_index, new_index) {
						[array[old_index], array[new_index]] = [array[new_index], array[old_index]];
						return array; // for testing purposes
					}
				}
			}
		});
})();
