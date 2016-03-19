'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

//CREATE
router.post('/', controller.create);
//READ
router.get('/', auth.hasRole('admin'), controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/stats', auth.hasRole('admin'), controller.stats);
//UPDATE
router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/me', auth.isAuthenticated(), controller.update);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/answers', auth.isAuthenticated(), controller.answers);
router.put('/me/answers', auth.isAuthenticated(), controller.answers);
//DELETE
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

export default router;
