'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import {preRemoveHook} from '../../config/multer';
let preRemoveIcon = preRemoveHook('icon');

var TestSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	icon: String,
	type: {
		type: String,
		required: true
	},
	userNeeded: Boolean,
	shortDesc: String,
	longDesc: String,
	instruction: {
		type: String,
		required: true
	},
	creationDate: {
		type: Date,
		required: true,
		default: Date.now
	},
	content: {
		type: {},
		required: true
	},
	func: String
});

TestSchema
	.pre('remove', preRemoveIcon);

export default mongoose.model('Test', TestSchema);
