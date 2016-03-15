let fs = require('fs'),
	path = require('path');
import TestModel from '../server/api/test/test.model';

function getDirectories(srcpath) {
	return fs.readdirSync(srcpath).filter(function(file) {
		return fs.statSync(path.join(srcpath, file)).isDirectory();
	});
}

class Tests {
	constructor() {
		if (Tests.instance) return Tests.instance;
		Tests.instance = this;
	}

	parse(test) {
		return test.func ? Object.assign({}, test, { func: test.func.toString() }) : test;
	}

	parseAll() {
		return getDirectories(__dirname).map(dir =>
				this.parse(require(`${__dirname}/${dir}/test`))
		);
	}

	load(test) {
		return new Promise((resolve, reject) => {
			try {
				let testObj = test.toObject;
				if (testObj.func) testObj.func = (new Function('return ' + testObj.func))();
				this[testObj._id] = testObj;
				resolve(test);
			} catch (err) { reject(err); }
		});
	}

	loadAll() {
		return TestModel.findAsync().then(tests => {
			for (let i = 0; i < tests.length; i++) {
				let test = tests[i].toObject();
				if (test.func) test.func = (new Function('return ' + test.func))();
				this[test._id] = test;
			}
		});
	}

	pass({testId, answers}, user) {
		let test = this[testId];
		let func = test && test.func;
		if (func) return func.call(test, answers, user);
	}
}

export default (new Tests());
