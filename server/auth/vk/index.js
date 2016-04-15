'use strict';

import express from 'express';
import passport from 'passport';
import {socialCallback} from '../auth.service';
import {createWithProvider} from '../../api/user/user.controller';

var router = express.Router();

router
	.get('/', passport.authenticate('vkontakte', {
		scope: ['email'],
		failureRedirect: '/signup',
		session: false
	}))
	.get('/callback', socialCallback('vkontakte'))
	.post('/complete', createWithProvider('vk'));

export default router;
