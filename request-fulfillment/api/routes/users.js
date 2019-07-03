const express = require('express');
const router = express.Router();
const { checkUser } = require('../middleware/auth');
const users = require('../helpers/users');

router.get('/', (req, res, next) => {
    users.getUsers()
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

router.get('/:id', (req, res, next) => {
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

router.post('/:id/manage/give-admin-permission', (req, res, next) => {
    const userID = Number(req.params.id);
    users.manageUsers.giveAdminPrivilege(userID)
        .then(() => {
            res.status(200).json({
                status: 'success'
            });
        })
        .catch((err) => next(err));
});

router.post('/:id/manage/approve', (req, res, next) => {
    const userID = Number(req.params.id);
    users.manageUsers.approveUser(userID)
        .then(() => {
            res.status(200).json({
                status: 'success'
            });
        })
        .catch((err) => next(err));
});

router.post('/:id/manage/reject', (req, res, next) => {
    const id = Number(req.params.id);
    users.manageUsers.rejectUser(id)
        .then(() => {
            res.status(200).json({
                status: 'success'
            });
        })
        .catch((err) => next(err));
});

module.exports = router;
