'use strict';

import {Router} from 'express';
import * as controller from './resources.controller';
import * as auth from '../auth/auth.service';

var router = new Router();

router.get('/:type/:id', controller.index);

module.exports = router;
