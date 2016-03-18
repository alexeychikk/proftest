let fs = require('fs');
let multer = require('multer');
let randomstring = require('randomstring');
let mime = require('mime');
import config from '../config/environment';

const fieldnameDir = {
	'avatar': '/avatars',
	'icon': '/icons'
};

let upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			let dir = fieldnameDir[file.fieldname];
			if (dir) cb(null, config.resources + dir);
			else cb(new Error('File fieldname does not match any acceptable one!'));
		},
		filename: function (req, file, cb) {
			let ext = '.' + mime.extension(file.mimetype);
			let filename = randomstring.generate() + ext;
			while (fs.existsSync(file.destination + '/' + filename)) {
				filename = randomstring.generate() + ext;
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

export default function(fieldname) {
	let uploadSingle = upload.single(fieldname);
	return function (req, res) {
		return function(entity) {
			return new Promise((resolve, reject) => {
				uploadSingle(req, res, function(err) {
					if (err) reject(err);
					else {
						if (req.file && req.file.filename) {
							if (entity[fieldname]) {
								let oldFileName = req.file.destination + '/' + entity[fieldname];
								if (fs.existsSync(oldFileName)) fs.unlink(oldFileName);
							}
							entity[fieldname] = req.file.filename;
							return entity.saveAsync().spread(ent => resolve(ent)).catch(err => reject(err));
						}
						resolve(entity);
					}
				});
			});
		};
	}
};

export function deleteResource(entity, fieldname) {
	return new Promise((resolve, reject) => {
		let path = config.resources + fieldnameDir[fieldname] + '/' + entity[fieldname];
		if (fs.existsSync(path)) fs.unlink(path, err => {
			if (err) reject(err);
			else resolve();
		});
		else resolve();
	});
}

export function preRemoveHook(fieldname) {
	return function(next) {
		if (this[fieldname]) deleteResource(this, fieldname).then(() => next()).catch(err => next(err));
		else next();
	};
}
