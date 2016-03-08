'use strict';

var express = require('express');
var controller = require('./test.controller.js');

var router = express.Router();

//CREATE
router.post('/', controller.create);
//READ
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/stats', controller.stats);
//UPDATE
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
//DELETE
router.delete('/:id', controller.destroy);

module.exports = router;
