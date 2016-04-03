"use strict";

(function () {

    class AccountController {

        constructor(Auth, User, Test, $q, $http, $routeParams, $location) {
			this.$q = $q;
			this.$http = $http;
			this.$location = $location;
			this.User = User;

			this.editing = {};
			this.loaded = false;

			Auth.getCurrentUser(_.noop).then(user => {
				this.ownProfile = $routeParams.id == user._id;
				if (this.ownProfile) return user;
				return User.get({id: $routeParams.id}).$promise;
			}).then(user => {
				this.user = user.toJSON();

				for (let i in this.user.education) {
					if (this.user.education[i].startYear)
						this.user.education[i].startYear = +this.user.education[i].startYear;
					if (this.user.education[i].endYear)
						this.user.education[i].endYear = +this.user.education[i].endYear;
				}

				for (let i in this.user.work) {
					if (typeof this.user.work[i].startDate == "string")
						this.user.work[i].startDate = new Date(this.user.work[i].startDate);
					if (typeof this.user.work[i].endDate == "string")
						this.user.work[i].endDate = new Date(this.user.work[i].endDate);
				}

				this.info = angular.copy(this.user);

				if (this.user.tests.length) {
					let testsIds = this.user.tests.map(test => test._id);
					return Test[testsIds.length == 1 ? 'get' : 'query']
						({[testsIds.length == 1 ? 'id' : 'ids']: testsIds, fields: {name: true}}).$promise;
				}
			}).then(tests => {
				if (tests) {
					if (this.user.tests.length == 1) {
						this.user.tests[0].name = tests.name;
					}
					else for (let test of this.user.tests) {
						test.name = tests.find(t => t._id == test._id).name;
					}
				}
				this.loaded = true;
			})
			.catch(() => this.loaded = true);
        }

		edit(category) {
			if (category === 'name') {
				this.info.firstName = this.user.firstName;
				this.info.lastName = this.user.lastName;
			}
			else if (category === 'general') {
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
				if (category === 'name') {
					var firstName = this.info.firstName.trim(),
						lastName = this.info.lastName.trim();
					if (firstName != this.user.firstName.trim()) fields.firstName = firstName;
					if (lastName != this.user.lastName.trim()) fields.lastName = lastName;
				}
				else if (category === 'general') {
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
						if (category === 'name') {
							this.user.firstName = firstName;
							this.user.lastName = lastName;
						}
						else this.user[category] = this.info[category];
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
