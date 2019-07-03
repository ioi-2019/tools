const express = require('express');
const router = express.Router();
const { login, register, logout } = require('../helpers/auth');
const { respondSuccess } = require('../helpers/responder');

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    login(username, password)
        .then((account) => {
            res.status(200).json({
                status: 'success',
                data: {
                    account: account
                }
            });
        })
        .catch((err) => next(err));
});

router.post('/logout', (req, res, next) => {
    const username = req.body.username;
    const authToken = req.body.authToken;
    logout(username, authToken)
        .then(() => {
            respondSuccess(res);
        })
        .catch((err) => next(err));
});

router.post('/register', (req, res, next) => {
    const { username, firstName, lastName, password } = req.body;
    register({
        username,
        firstName,
        lastName,
        password
    })
        .then(() => {
            respondSuccess(res);
        })
        .catch((err) => next(err));
});

/* router.post('/forget-password', (req, res, next) => {

}); */

module.exports = router;
