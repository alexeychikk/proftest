'use strict';

import User from './user.model';
import { UserSchema } from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import Tests from '../../../tests';
import upload from '../../config/multer';
let uploadAvatar = upload('avatar');

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function (err) {
        res.status(statusCode).json(err);
    }
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

function parseFields(fields) {
	if (fields) {
		fields = JSON.parse(fields);
		var include = fields[Object.keys(fields)[0]];
		if (include) {
			delete fields.salt;
			delete fields.password;
		} else {
			fields.salt = false;
			fields.password = false;
		}
		return fields;
	} else return { salt: false, password: false };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
	req.query.fields = parseFields(req.query.fields);

    User.findAsync(req.query.ids && {'_id': { $in: req.query.ids}} || {}, req.query.fields)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
	createWithProvider('local')(req, res, next);
}

export function createWithProvider(provider) {
	return function(req, res, next) {
		var newUser = new User(req.body);
		newUser.provider = provider;
		newUser.role = 'user';
		newUser.saveAsync()
			.spread(uploadAvatar(req, res)).then(function (user) {
				var token = jwt.sign({_id: user._id}, config.secrets.session, {
					expiresIn: 60 * 60 * 5
				});
				res.json({token});
			})
			.catch(validationError(res));
	};
}

/**
 * Get a single user
 */
export function show(req, res, next) {
    var userId = req.params.id;
	req.query.fields = parseFields(req.query.fields);

    User.findByIdAsync(userId, req.query.fields)
        .then(user => {
            if (!user) {
                return res.status(404).end();
            }
            res.json(user);
        })
        .catch(err => next(err));
}

export function stats(req, res, next) {
	//TODO: users stas for admins
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
    User.findByIdAndRemoveAsync(req.params.id)
        .then(function () {
            res.status(204).end();
        })
        .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findByIdAsync(userId)
        .then(user => {
            if (user.authenticate(oldPass)) {
                user.password = newPass;
                return user.saveAsync()
                    .then(() => {
                        res.status(204).end();
                    })
                    .catch(validationError(res));
            } else {
                return res.status(403).end();
            }
        });
}

/**
 * Update user info. Example:
 *
 * 			$http.get('/api/users/me').then(response => {
				$http.put(`/api/users/${response.data._id}`, {firstName: 'Loh', lastName: 'Ivanovich'})
					.then(response => console.log(response));
			});
 */
export function update(req, res, next) {
	var userId = ((req.user._id == req.params.id || req.path == '/me') && req.user._id)
		|| ((req.user.role == 'admin') && req.params.id);
	console.log(userId);
	if (!userId) {
		return res.status(403).send('Forbidden');
	}

	for (var i in req.body) {
		var field = UserSchema.tree[i];
		if (!(field && field.canUpdate)) return res.status(422).send(`Field "${i}" can not be updated!`);
	}

	User.findByIdAndUpdateAsync(userId, req.body, {runValidators: true, new: true})
		.then(uploadAvatar(req, res))
		.then(user => {
			res.status(200).json(user);
		}).catch(validationError(res));
}

/**
 * Pass test with answers. Example:
 *
 *             $http.get('/api/tests').then(response => {
                this.awesomeTests = response.data;
				let testId = this.awesomeTests.find(t => t.type === 'TEENAGE_KETTEL')._id;
				$http.put('/api/users/me/answers', {testId, answers: [
					0, 0, 1, 0, 0, 0, 1, 1, 2, 0, 0, 0, 0, 2, 0, 1, 1, 0, 1, 0,
					0, 0, 1, 0, 1, 0, 0, 1, 1, 2, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1,
					0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2, 2, 1, 0, 0, 0, 1, 1, 0,
					1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0,
					2, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 2, 1, 1, 0, 0, 0, 0, 0, 1,
					1, 1, 1, 0, 1, 2, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
					0, 1, 1, 0, 2, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 2
				]}).then(response => console.log(response.data));
            });
 */
export function answers(req, res, next) {
	try {
		var result = Tests.pass(req.body, req.user);
	} catch (err) {
		return res.status(422).json(err);
	}
	User.updateAsync({_id: req.user._id}, {
		$push: {"tests": {_id: req.body.testId, answers: req.body.answers, result} }
	}, {runValidators: true, multi: false}).then(() => {
		res.status(200).json(result);
	}).catch(validationError(res));
}

/**
 * Get my info
 */
export function me(req, res, next) {
    var userId = req.user._id;
	req.query.fields = parseFields(req.query.fields);

    User.findByIdAsync(userId, req.query.fields)
        .then(user => { // don't ever give out the password or salt
            if (!user) {
                return res.status(401).end();
            }
            res.json(user);
        })
        .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
    res.redirect('/');
}
