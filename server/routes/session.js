//@ts-check

import express from 'express';

var router = express.Router();

const isUserLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
};

router.get('/check-session', function (req, res, next) {
    if (req.user) {
        res.send({ "isLoggedIn": true });
    } else {
        res.send({
            isLoggedIn: false,
            redirectUrl: '/login',
        });
    }
});

router.post('/getUser', isUserLoggedIn, function (req, res, next) {
    res.send(req.user);
});

export default router;
