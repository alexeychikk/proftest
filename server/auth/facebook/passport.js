import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';

export function setup(User, config) {
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            profileFields: [
				'email', 'first_name', 'last_name', 'gender', 'birthday'
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
