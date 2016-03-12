'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TestSchema = new mongoose.Schema({
	name: String,
	icon: String,
	type: String,
	shortDesc: String,
	longDesc: String,
	instruction: String,
	creationDate: {
		type: Date,
		default: Date.now
	},
	content: {},
	func: String
});

export default mongoose.model('Test', TestSchema);
