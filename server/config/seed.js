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
	});

User.find({}).removeAsync()
	.then(() => {
		User.createAsync({
			provider: 'local',
			name: 'Test User',
			email: 'test@example.com',
			password: 'test'
		}, {
			provider: 'local',
			role: 'admin',
			name: 'Admin',
			email: 'admin@example.com',
			password: 'admin'
		})
			.then(() => {
				console.log('finished populating users');
			});
	});
