'use strict';

import express from 'express';
import passport from 'passport';
import {socialCallback} from '../auth.service';
import {createWithProvider} from '../../api/user/user.controller';

var router = express.Router();

router
    .get('/', passport.authenticate('facebook', {
        scope: ['email', 'public_profile', 'user_birthday', 'user_education_history', 'user_work_history'],
        failureRedirect: '/signup',
        session: false
    }))
    .get('/callback', socialCallback('facebook'))
	.post('/complete', createWithProvider('facebook'));

export default router;
