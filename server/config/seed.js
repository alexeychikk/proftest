/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Test from '../api/test/test.model.js';
import User from '../api/user/user.model';
import parseTests from '../../tests/parseTests';

Test.find({}).removeAsync()
	.then(() => {
		Test.create(parseTests());
	})
	.then(() => {
		console.log('finished populating tests');
	});

User.find({}).removeAsync()
	.then(() => {
		User.createAsync({
			firstName: 'Test',
			lastName: 'User',
			provider: 'local',
			email: 'test@example.com',
			password: 'test',
			birthDate: new Date('1995-13-02'),
			gender: 'M'
		}, {
			firstName: 'Admin',
			lastName: 'Loh',
			provider: 'local',
			role: 'admin',
			email: 'admin@example.com',
			password: 'admin',
			birthDate: new Date('1990-05-01'),
			gender: 'F'
		})
			.then(() => {
				console.log('finished populating users');
			});
	});
