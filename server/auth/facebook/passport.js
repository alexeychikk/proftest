import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';

function isValidDate(date) {
	return Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date.getTime());
}

/***
 * @return { [{name: String, speciality: String, endYear: Number}] }
 */
function parseEducation(education) {
	try {
		var res = [];
		for (var i in education) {
			var edi = education[i];
			if (edi.school && edi.school.name) {
				var ed = {name: edi.school.name};
				if (edi.concentration && edi.concentration.length && edi.concentration[0].name)
					ed.speciality = edi.concentration[0].name;
				if (edi.year && edi.year.name) ed.endYear = +edi.year.name;
				res.push(ed);
			}
		}
		return res;
	} catch (e) {}
}

/***
 * @return { [{company: String, position: String, startDate: Date, endDate: Date}] }
 */
function parseWork(work) {
	try {
		var res = [];
		for (var i in work) {
			var woi = work[i];
			if (woi.employer && woi.employer.name) {
				var wo = {company: woi.employer.name};
				if (woi.position && woi.position.name) wo.position = woi.position.name;
				if (woi.start_date) {
					var sd = new Date(woi.start_date);
					if (isValidDate(sd)) wo.startDate = sd;
				}
				if (woi.end_date) {
					var ed = new Date(woi.end_date);
					if (isValidDate(ed)) wo.endDate = ed;
				}
				res.push(wo);
			}
		}
		return res;
	} catch (e) {}
}

export function setup(User, config) {
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            profileFields: [
				'email', 'first_name', 'last_name', 'gender', 'birthday', 'education', 'work'
            ]
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOneAsync({
                    'facebook.id': profile.id
                })
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }

                    user = new User({
						email: profile._json.email,
                        firstName: profile._json.first_name,
						lastName: profile._json.last_name,
						gender: profile._json.gender[0],
						birthDate: profile._json.birthday,
						education: parseEducation(profile._json.education),
						work: parseWork(profile._json.work),
                        role: 'user',
                        provider: 'facebook',
                        facebook: profile._json
                    });
                    user.saveAsync()
                        .spread(user => done(null, user))
                        .catch(err => done(Object.assign( {}, {errors: err.errors}, {user: user.toObject()} )));
                })
                .catch(err => done(err));
        }));
}
