"use strict";

(function () {

    class AccountController {

        constructor(Auth, User, $q, $http, $routeParams) {
			this.$q = $q;
			this.$http = $http;
			this.User = User;
			this.editing = {};

			Auth.getCurrentUser(_.noop).then(user => {
				this.ownProfile = $routeParams.id == user._id;
				if (this.ownProfile) return user;
				return User.get({id: $routeParams.id}).$promise;
			}).then(user => {
				this.user = user.toJSON();

				for (var i in this.user.education) {
					if (this.user.education[i].startYear)
						this.user.education[i].startYear = +this.user.education[i].startYear;
					if (this.user.education[i].endYear)
						this.user.education[i].endYear = +this.user.education[i].endYear;
				}

				for (var i in this.user.work) {
					if (typeof this.user.work[i].startDate == "string")
						this.user.work[i].startDate = new Date(this.user.work[i].startDate);
					if (typeof this.user.work[i].endDate == "string")
						this.user.work[i].endDate = new Date(this.user.work[i].endDate);
				}

				this.info = angular.copy(this.user);
			});
        }

		edit(category) {
			if (category === 'general') {
				this.info.gender = this.user.gender;
				this.info.birthDate = new Date(this.user.birthDate);
			}
			else if (category === 'education') {
				this.info.education = angular.copy(this.user.education);
			}
			else if (category === 'work') {
				this.info.work = angular.copy(this.user.work);
			}
			this.editing[category] = true;
		}

		addEducation () {
			this.info.education.unshift({});
		}

		removeEducation(index) {
			this.info.education.splice(index, 1);
		}

		addWork() {
			this.info.work.unshift({});
		}
		removeWork(index) {
			this.info.work.splice(index, 1);
		}

		save(category) {
			return this.$q((resolve, reject) => {
				var fields = {};
				if (category === 'general') {
					if (this.user.birthDate.getTime() != this.info.birthDate.getTime())
						fields.birthDate = this.info.birthDate;
					if (this.user.gender != this.info.gender) fields.gender = this.info.gender;
				}
				else if (category === 'education') {
					for (let i in this.info.education) {
						if (!this.info.education[i].name) this.info.education.splice(i, 1);
					}
					if (!angular.equals(this.user.education, this.info.education))
						fields.education = this.info.education;
				}
				else if (category === 'work') {
					for (let i in this.info.work) {
						if (!this.info.work[i].company) this.info.work.splice(i, 1);
					}
					if (!angular.equals(this.user.work, this.info.work))
						fields.work = this.info.work;
				}
				if (!Object.keys(fields).length) {
					this.editing[category] = false;
					return resolve(true);
				}
				this.$http.put(`/api/users/${this.user._id}`, fields)
					.then(res => {
						this.user[category] = this.info[category];
						this.editing[category] = false;
						resolve(true);
					})
					.catch(err => {
						resolve(false);
					});
			});
		}

		cancel(category) {
			this.editing[category] = false;
		}
	}

    angular.module('proftestApp.account')
        .controller('AccountController', AccountController);

})();
