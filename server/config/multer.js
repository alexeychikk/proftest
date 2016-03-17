let fs = require('fs');
let multer = require('multer');
let randomstring = require('randomstring');
import config from '../config/environment';

const fieldnameDir = {
	'avatar': '/avatars',
	'icon': '/icons'
};

module.exports = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			let dir = fieldnameDir[file.fieldname];
			if (dir) cb(null, config.resources + dir);
			else cb(new Error('File fieldname does not match any acceptable one!'));
		},
		filename: function (req, file, cb) {
			let filename = randomstring.generate() + '.jpg';
			while (fs.existsSync(config.resources + file.destination + '/' + filename)) {
				filename = randomstring.generate() + '.jpg';
			}
			cb(null, filename);
		}
	}),
	limits: {fileSize: 5242880},
	fileFilter: function (req, file, cb) {
		if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg')
			cb(null, false);
		else cb(null, true);
	}
});
