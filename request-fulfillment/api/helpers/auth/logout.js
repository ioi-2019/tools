const { knex } = require('../../db/config');
const { tables } = require('../constants');

module.exports = (username, authToken) => {
    return knex(tables.TABLE_USERS)
        .update({
            auth_token: null
        })
        .where({
            username: username,
            auth_token: authToken
        })
        .then((rows) => {
            if (rows > 0) {
                return Promise.resolve();
            } else {
                throw new Error('Could not logout');
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};