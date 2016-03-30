"use strict";

(function () {

    class AdminController {
        constructor(User, Test, Auth, $location) {
			this.currentUser = Auth.getCurrentUser();
			this.$location = $location;
            this.users = User.query((resp) => {
				this.users = this.users.filter((item) => this.currentUser._id !== item._id);

				for (let user of resp) {
					for (let test of user.tests) {
						Test.get({ id: test._id, fields: { 'name': true } })
							.$promise.then((resp) => test.name = resp.name);
					}
				}
			});
        }

		goToUserPage(user) {
			this.$location.path('/user/' + user._id);
		}

		goToResultPage(user, test, event) {
			this.$location.path('/result/' + user._id + '/' + test._id);
			event.stopPropagation();
		}

		sendEmail(user, event) {
			console.log('Email sent to ' + user.email);
			event.stopPropagation();
		}

        remove(user, event) {
            user.$remove();
            this.users.splice(this.users.indexOf(user), 1);
			event.stopPropagation();
        }

		openMenu($mdOpenMenu, event) {
			event.stopPropagation();
			$mdOpenMenu(event);
		}
    }

    angular.module('proftestApp.admin')
        .controller('AdminController', AdminController);

})();
