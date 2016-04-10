'use strict';

import express from 'express';
import passport from 'passport';
import {setTokenCookie} from '../auth.service';
import {createWithProvider} from '../../api/user/user.controller';
var qs = require('qs');
var router = express.Router();

router
	.get('/', passport.authenticate('vkontakte', {
		scope: ['email'],
		failureRedirect: '/signup',
		session: false
	}))
	.get('/callback', function (req, res, next) {
		passport.authenticate('vkontakte', function (err, user, info) {
			if (err) {
				res.redirect('/signup?' + qs.stringify(err));
			}
			else {
				req.user = user;
				setTokenCookie(req, res);
			}
		})(req, res, next);
	})
	.post('/complete', createWithProvider('vk'));

export default router;
