'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

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

export default mongoose.model('Test', TestSchema);
