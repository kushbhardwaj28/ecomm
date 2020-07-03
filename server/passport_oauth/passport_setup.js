//@ts-check

import passport from 'passport';
import googleOAuth from 'passport-google-oauth';
import fbOAuth from 'passport-facebook';
import { sellerFindOrCreate } from '../services/user_service.js';
import connection from '../connection/db_connection.js';

const GoogleStrategy = googleOAuth.OAuth2Strategy;
const FacebookStrategy = fbOAuth.Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // User.findById(id, function (err, user) {
    done(null, user);
    // });
});

passport.use(new GoogleStrategy({
    clientID: "113817837187-q43nrc6fc87e28c9ep4ms50nmigfj5rp.apps.googleusercontent.com",
    clientSecret: "PH7GLYiMfwL31uj7tLsXPTDc",
    callbackURL: "http://localhost:3000/login/google/callback"
},
    (accessToken, refreshToken, profile, done) => {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return sellerFindOrCreate(profile, connection, done);
        // return done(null, profile);
        // });
    }
));

passport.use(new FacebookStrategy({
    clientID: "638051787057565",
    clientSecret: "26547af60b264af774f239781fa22027",
    callbackURL: "http://localhost:3000/login/facebook/callback",
    profileFields: ['id', 'email', 'link', 'name'],
},
    function (accessToken, refreshToken, profile, done) {
        return sellerFindOrCreate(profile, connection, done);
        // getUser(profile.emails[0].value, connection, (result, err) => {
        //     if (err) {
        //         console.log(err);
        //         throw err;
        //     }
        //     if (result.length > 0) {
        //         return done(null, result[0]);
        //     } else {
        //         return createUser(
        //             profile.name.givenName + ' ' + profile.name.familyName,
        //             profile.emails[0].value, connection,
        //             // profile.
        //             (result, err) => {
        //                 if (err) {
        //                     console.log(err);
        //                     throw err;
        //                 }
        //                 done(null, result[0]);
        //             });
        //     }
        // });
        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        // });
    }
));
