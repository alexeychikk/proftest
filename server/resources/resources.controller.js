let fs = require('fs');
import config from '../config/environment';

export function index(req, res) {
	let filename = config.resources + '/' + req.path;
	fs.exists(filename, function (exists) {
		if (exists) {
			res.status(200).sendFile(filename);
		} else {
			res.status(404).end();
		}
	});
}
