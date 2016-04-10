import passport from 'passport';
import {Strategy as VKStrategy} from 'passport-vkontakte';

export function setup(User, config) {
	passport.use(new VKStrategy({
			clientID: config.vk.clientID,
			clientSecret: config.vk.clientSecret,
			callbackURL: config.vk.callbackURL,
			profileFields: [
				'email', 'first_name', 'last_name', 'sex', 'bdate',
				'education', 'universities', 'career'
			]
		},
		function (accessToken, refreshToken, params, profile, done) {
			User.findOneAsync({
				'vk.id': profile.id
			})
				.then(user => {
					if (user) {
						return done(null, user);
					}

					user = new User({
						email: params.email,
						firstName: profile._json.first_name,
						lastName: profile._json.last_name,
						gender: profile.gender[0],
						birthDate: profile.birthday,
						role: 'user',
						provider: 'vk',
						vk: profile._json
					});
					user.saveAsync()
						.spread(user => done(null, user))
						.catch(err => done(Object.assign( {}, {errors: err.errors}, {user: user.toObject()} )));
				})
				.catch(err => done(err));
		}));
}
