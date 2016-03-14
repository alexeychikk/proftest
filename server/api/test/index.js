'use strict';

import {Router} from 'express';
import * as controller from './test.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

//CREATE
router.post('/', auth.hasRole('admin'), controller.create);
//READ
router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id/stats', auth.hasRole('admin'), controller.stats);
//UPDATE
router.put('/:id', auth.hasRole('admin'), controller.update);
//DELETE
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
