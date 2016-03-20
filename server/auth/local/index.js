'use strict';

import express from 'express';
import passport from 'passport';
import {signToken} from '../auth.service';

var router = express.Router();

router.post('/', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        var error = err || info;
        if (error) {
            return res.status(401).json(error);
        }
        if (!user) {
            return res.status(404).json({message: 'Что-то пошло не так. Пожалуйста, попробуйте заново.'});
        }

        var token = signToken(user._id, user.role);
        res.json({token});
    })(req, res, next)
});

export default router;
