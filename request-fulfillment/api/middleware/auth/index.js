const checkToken = require('./check-token');

let username = null;
let authToken = null;

const checkAdmin = () => {
    return (req, res, next) => {
        normalizeParams(req);
        checkToken.checkAdmin(username, authToken)
            .then((passed) => {
                if (passed === true) {
                    next();
                } else {
                    throw new Error('Authentication failed');
                }
            })
            .catch((err) => {
                // TODO: clean up this part
                res.status(200).json({
                    status: 'fail',
                    message: 'error_occured'
                });
            });
    };
};

const checkUser = () => {
    return (req, res, next) => {
        normalizeParams(req);
        checkToken.checkUser(username, authToken)
            .then((passed) => {
                if (passed === true) {
                    next();
                } else {
                    throw new Error('Authentication failed');
                }
            })
            .catch((err) => {
                res.status(200).json({
                    status: 'fail',
                    message: 'error_occured'
                });
            });
    };
};

const normalizeParams = (req) => {
    if (req.method === 'GET') {
        username = req.query.username;
        authToken = req.query.authToken;
    } else if (req.method === 'POST') {
        username = req.body.username;
        authToken = req.body.authToken;
    }
};

module.exports = {
    checkAdmin,
    checkUser
};