const { knexRF } = require('../../db/config');
const tables = require('../../helpers/constants/tables');

const checkAdmin = (username, authToken) => {
    return checkToken({
        username: username,
        auth_token: authToken,
        is_admin: true
    });
};

const checkUser = (username, authToken) => {
    return checkToken({
        username: username,
        auth_token: authToken
    });
};

const checkToken = (params) => {
    return knexRF(tables.TABLE_USERS)
        .select('*')
        .where(params)
        .first()
        .then((user) => {
            if (user) {
                return Promise.resolve(true);
            } else {
                throw new Error('User not found');
            }
        })
        .catch((err) => {
            return Promise.resolve(false);
        });
};

module.exports = {
    checkAdmin,
    checkUser
};