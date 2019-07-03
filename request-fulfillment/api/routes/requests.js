const express = require('express');
const router = express.Router();
const { checkUser } = require('../middleware/auth');
const { getRequests, getRequest } = require('../helpers/requests');

router.get('/', (req, res, next) => {
    getRequests()
        .then((requests) => {
            res.status(200).json({
                status: 'success',
                data: {
                    requests: requests
                }
            });
        })
        .catch((err) => next(err));
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    getRequest.getRequestById(id)
        .then((request) => {
            res.status(200).json({
                status: 'success',
                data: {
                    request: request
                }
            });
        })
        .catch((err) => next(err));
});

module.exports = router;
