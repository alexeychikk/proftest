'use strict';

import User from './user.model';
import { UserSchema } from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

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

    User.findAsync({}, req.query.fields)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.saveAsync()
        .spread(function (user) {
            var token = jwt.sign({_id: user._id}, config.secrets.session, {
                expiresIn: 60 * 60 * 5
            });
            res.json({token});
        })
        .catch(validationError(res));
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
	var canUpdate = (req.user._id == req.params.id) || req.user.role == 'admin';
	if (!canUpdate) {
		return res.status(403).send('Forbidden');
	}

	for (var i in req.body) {
		var field = UserSchema.tree[i];
		if (!(field && field.canUpdate)) return res.status(422).send(`Field "${i}" can not be updated!`);
	}
	var userId = req.params.id;

	User.updateAsync({_id: userId}, req.body, {runValidators: true, multi: false}).then(() => {
		res.status(204).end();
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
