const { knex } = require('../../db/config');
const tables = require('../../helpers/constants/tables');

const checkAdmin = (username, authToken) => {
    return checkToken({
        username: username,
        auth_token: authToken,
        is_admin: true,
        is_approved: true
    });
};

const checkUser = (username, authToken) => {
    return checkToken({
        username: username,
        auth_token: authToken,
        is_approved: true
    });
};

const checkToken = (params) => {
    return knex(tables.TABLE_USERS)
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