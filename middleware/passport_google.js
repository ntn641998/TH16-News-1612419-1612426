const googleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model');

module.exports = function (app, passport) {

    passport.use(new googleStrategy({
        clientID: '565230475014-but330a8tqpkkkonm7gpd2e30vc6e96c.apps.googleusercontent.com',
        clientSecret: 'OBf18uG4BslF9nXqklRzCodH',
        callbackURL: "https://localhost:4200/login/google/cb"
      },
      (accessToken, refreshToken, profile, done) => {
        //console.log('profile',profile,profile._json)

        User.findOne({
            'googleId': profile.id
        }, function (err, user) {
            if (err) {
                console.log('err save', err)
                return done(null, false, { message: "find error" });
            }
            if (!user) {
                user = new User({
                    name: profile._json.name,
                    email: profile._json.email,
                    provider: 'google',
                    googleId: profile.id,
                    isAccepted: false
                });
                user.save(function (err) {
                    if (err) {
                        console.log('err save', err)
                        return done(null, false, { message: "Save user failed" });
                    } else {

                        return done(err, user);
                    }
                });
            } else {
                //found user. Return
                return done(err, user);
            }
        });
    }
    ))

}