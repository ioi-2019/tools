const checkToken = require('./check-token');

let username = null;
let authToken = null;

const checkAdmin = () => {
    return (req, res, next) => {
        normalizeParams(req);
        return checkToken.checkAdmin(username, authToken)
            .then((passed) => {
                if (passed === true) {
                    next();
                    return null;
                } else {
                    throw new Error('Authentication failed');
                }
            })
            .catch((err) => {
                res.status(200).json({
                    status: 'auth_fail'
                });
            });
    };
};

const checkUser = () => {
    return (req, res, next) => {
        normalizeParams(req);
        return checkToken.checkUser(username, authToken)
            .then((passed) => {
                if (passed === true) {
                    next();
                    return null;
                } else {
                    throw new Error('Authentication failed');
                }
            })
            .catch((err) => {
                res.status(200).json({
                    status: 'auth_fail'
                });
            });
    };
};

const normalizeParams = (req) => {
    if (req.method === 'GET') {
        username = req.query.username;
        authToken = req.query.auth_token;
    } else if (req.method === 'POST') {
        username = req.body.username;
        authToken = req.body.auth_token;
    }
};

module.exports = {
    checkAdmin,
    checkUser
};