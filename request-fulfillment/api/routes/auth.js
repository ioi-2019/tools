const express = require('express');
const router = express.Router();
const { login, register, logout } = require('../helpers/auth');
const { respondSuccess } = require('../helpers/responder');

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
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
    const { username, auth_token } = req.body;
    logout(username, auth_token)
        .then(() => {
            respondSuccess(res);
        })
        .catch((err) => next(err));
});

router.post('/register', (req, res, next) => {
    const { username, first_name, last_name, password } = req.body;
    register({
        username,
        first_name,
        last_name,
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
