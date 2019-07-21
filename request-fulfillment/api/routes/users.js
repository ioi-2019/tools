const express = require('express');
const router = express.Router();
const { checkUser, checkAdmin } = require('../middleware/auth');
const users = require('../helpers/users');

router.get('/', checkUser(), (req, res, next) => {
    users.getUsers.getAllUsers()
        .then((users) => {
            res.status(200).json({
                status: 'success',
                data: {
                    users: users
                }
            });
        })
        .catch((err) => next(err));
});

router.get('/active', checkUser(), (req, res, next) => {
    users.getUsers.getActiveUsers()
        .then((users) => {
            res.status(200).json({
                status: 'success',
                data: {
                    users: users
                }
            });
        })
        .catch((err) => next(err));
});

router.get('/pending', checkUser(), (req, res, next) => {
    users.getUsers.getPendingUsers()
        .then((users) => {
            res.status(200).json({
                status: 'success',
                data: {
                    users: users
                }
            });
        })
        .catch((err) => next(err));
});

router.get('/search', checkUser(), (req, res, next) => {
    const { query } = req.query;
    return users.getUsers.searchUsers(query)
        .then((users) => {
            res.status(200).json({
                status: 'success',
                data: {
                    users: users
                }
            });
        })
        .catch((err) => next(err));
});

router.get('/:id', checkUser(), (req, res, next) => {
    const userID = Number(req.params.id);
    users.getUser.getUserById(userID)
        .then((user) => {
            res.status(200).json({
                status: 'success',
                data: {
                    user: user
                }
            });
        })
        .catch((err) => next(err));
});

router.post('/:id/manage/give-admin-privilege', checkAdmin(), (req, res, next) => {
    const userID = Number(req.params.id);
    users.manageUsers.giveAdminPrivilege(userID)
        .then(() => {
            res.status(200).json({
                status: 'success'
            });
        })
        .catch((err) => next(err));
});

router.post('/:id/manage/take-admin-privilege', checkAdmin(), (req, res, next) => {
    const userID = Number(req.params.id);
    users.manageUsers.takeAdminPrivilege(userID)
        .then(() => {
            res.status(200).json({
                status: 'success'
            });
        })
        .catch((err) => next(err));
});

router.post('/:id/manage/approve', checkAdmin(), (req, res, next) => {
    const userID = Number(req.params.id);
    users.manageUsers.approveUser(userID)
        .then(() => {
            res.status(200).json({
                status: 'success'
            });
        })
        .catch((err) => next(err));
});

router.post('/:id/manage/reject', checkAdmin(), (req, res, next) => {
    const userID = Number(req.params.id);
    users.manageUsers.rejectUser(userID)
        .then(() => {
            res.status(200).json({
                status: 'success'
            });
        })
        .catch((err) => next(err));
});

module.exports = router;
