import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

function localAuthenticate(User, email, password, done) {
    User.findOneAsync({
            email: email.toLowerCase()
        })
        .then(user => {
            if (!user) {
                return done(null, false, {
					field: 'email',
                    message: 'Этот email не зарегистрирован'
                });
            }
            user.authenticate(password, function (authError, authenticated) {
                if (authError) {
                    return done(authError);
                }
                if (!authenticated) {
                    return done(null, false, {field: 'password', message: 'Вы ввели неправильный пароль'});
                } else {
                    return done(null, user);
                }
            });
        })
        .catch(err => done(err));
}

export function setup(User, config) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
    }, function (email, password, done) {
        return localAuthenticate(User, email, password, done);
    }));
}
