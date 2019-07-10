const { knexRF } = require('../../db/config');
const { tables } = require('../constants');
const { tokenGenerator } = require('../generators');
const { checkPassword } = require('./hasher');

module.exports = (username, password) => {
    const authToken = tokenGenerator.generateAuthToken();
    return knexRF(tables.TABLE_USERS)
        .select('password')
        .where({
            username: username
        })
        .first()
        .then((user) => {
            return checkPassword(password, user.password);
        })
        .then(() => {
            return knexRF(tables.TABLE_USERS)
                .update({
                    auth_token: authToken
                })
                .where({
                    username: username
                })
                .returning('*');
        })
        .then((users) => {
            const user = users[0];
            if (user) {
                return Promise.resolve({
                    username: user.username,
                    auth_token: user.auth_token,
                    is_admin: user.is_admin
                });
            } else {
                throw new Error('Could not login');
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};