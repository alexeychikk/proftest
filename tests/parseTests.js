let fs = require('fs'),
	path = require('path');

function getDirectories(srcpath) {
	return fs.readdirSync(srcpath).filter(function(file) {
		return fs.statSync(path.join(srcpath, file)).isDirectory();
	});
}

function parseTest(test) {
	return test.func ? Object.assign({}, test, { func: `(function() { return ${test.func.toString()} ;})();`}) : test;
}

export default function parseTests() {
	return getDirectories(__dirname).map(dir =>
		parseTest(require(`${__dirname}/${dir}/test`))
	);
}
