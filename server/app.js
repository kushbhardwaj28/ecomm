// @ts-check

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from 'passport';
import cookieSession from 'cookie-session';
import cors from 'cors';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import storeRouter from './routes/store.js';
import sessionRouter from './routes/session.js';
import categoryRouter from './routes/category.js';
import productRouter from './routes/product.js';

import './passport_oauth/passport_setup.js';

var app = express();
const __dirname = path.resolve();

export const isUserLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
};

app.use(cors(
    {
        origin: ["http://localhost:4200", "http://localhost:8080"],
        credentials: true,
    }
));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
    name: 'ecomm',
    keys: ['key1', 'key2']
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);

app.use('/api/user', isUserLoggedIn, usersRouter);
app.use('/api', sessionRouter);
app.use('/api/store', isUserLoggedIn, storeRouter);
app.use('/api/category', isUserLoggedIn, categoryRouter);
app.use('/api/product', isUserLoggedIn, productRouter);

app.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/user.phonenumbers.read'], }));
app.get('/login/google/callback', passport.authenticate('google'),
    (req, res) => {
        res.send("<script>window.close();</script >");
    }
);
app.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/login/facebook/callback', passport.authenticate('facebook'),
    (req, res) => {
        res.send("<script>window.close();</script >");
    });

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.send({ loggedOut: true });
});

export default app;
