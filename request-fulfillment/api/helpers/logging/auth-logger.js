const { knexRF } = require('../../db/config');
const { TABLE_AUTH_LOGS } = require('../constants/tables');

// TODO: complete

const logSigningIn = (userId) => {
    return logAuthAction(userId, 'login');
};

const logSigningOut = (userId) => {
    return logAuthAction(userId, 'logout');
};

const logRegistration = (userId) => {
    return logAuthAction(userId, 'register');
};

const logAuthAction = (userId, action) => {
    return knexRF(TABLE_AUTH_LOGS)
        .insert({
            user_id: userId,
            action: action,
            logged_at: knexRF.fn.now()
        })
        .then((requests) => {
            const rows = requests.length;
            console.log(rows);
            if (rows > 0) {
                return Promise.resolve();
            } else {
                throw new Error('Could not insert log');
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

module.exports = {
    logSigningIn,
    logSigningOut,
    logRegistration
};