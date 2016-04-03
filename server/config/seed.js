/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Test from '../api/test/test.model.js';
import User from '../api/user/user.model';
import Tests from '../../tests';

Test.find({}).removeAsync()
	.then(() => {
		Test.create(Tests.parseAll());
	})
	.then(Tests.loadAll)
	.then(() => {
		console.log('finished populating tests');
		Test.findOneAsync().then(test => {

			User.find({}).removeAsync()
				.then(() => {
					User.createAsync({
							firstName: 'Test1',
							lastName: 'User',
							provider: 'local',
							email: 'test1@example.com',
							password: 'test',
							birthDate: new Date('1995-13-02'),
							gender: 'M',
							tests: []
						}, {
							firstName: 'Test2',
							lastName: 'User',
							provider: 'local',
							email: 'test2@example.com',
							password: 'test',
							birthDate: new Date('1995-13-02'),
							gender: 'M',
							tests: []
						}, {
							firstName: 'Test3',
							lastName: 'User',
							provider: 'local',
							email: 'test3@example.com',
							password: 'test',
							birthDate: new Date('1995-13-02'),
							gender: 'M',
							tests: []
						}, {
							firstName: 'Test4',
							lastName: 'User',
							provider: 'local',
							email: 'test4@example.com',
							password: 'test',
							birthDate: new Date('1995-13-02'),
							gender: 'M',
							tests: []
						}, {
							firstName: 'Test5',
							lastName: 'User',
							provider: 'local',
							email: 'test5@example.com',
							password: 'test',
							birthDate: new Date('1995-13-02'),
							gender: 'M',
							tests: []
						}, {
							firstName: 'Test6',
							lastName: 'User',
							provider: 'local',
							email: 'test6@example.com',
							password: 'test',
							birthDate: new Date('1995-13-02'),
							gender: 'M',
							tests: []
						}, {
							avatar: 'admin.jpg',
							firstName: 'Admin',
							lastName: 'Loh',
							provider: 'local',
							role: 'admin',
							email: 'admin@example.com',
							password: 'admin',
							birthDate: new Date('1998-01-01'),
							gender: 'F',
							tests: [
								{
									_id: test._id,
									passingDate: new Date(),
									answers: { bad: 'answer' },
									result: { bad: 'result' }
								}
							]
						})
						.then(() => {
							console.log('finished populating users');
						});
				});

		});
	});
