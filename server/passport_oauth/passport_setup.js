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
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "google-client-id",
    clientSecret: "google-secret",
    callbackURL: "http://localhost:3000/login/google/callback"
},
    (accessToken, refreshToken, profile, done) => {
        return sellerFindOrCreate(profile, connection, done);
    }
));

passport.use(new FacebookStrategy({
    clientID: "fb-client-id",
    clientSecret: "fb-client-secret",
    callbackURL: "http://localhost:3000/login/facebook/callback",
    profileFields: ['id', 'email', 'link', 'name'],
},
    function (accessToken, refreshToken, profile, done) {
        return sellerFindOrCreate(profile, connection, done);
    }
));
