const { knex } = require('../../db/config');
const { tables, errors } = require('../constants');
const { tokenGenerator } = require('../generators');
const { checkPassword } = require('./hasher');
const AppError = require('../errors/app-error');

module.exports = (username, password) => {
    const authToken = tokenGenerator.generateAuthToken();
    return knex(tables.TABLE_USERS)
        .select('password', 'is_approved')
        .where({
            username: username
        })
        .first()
        .then((user) => {
            if (user) {
                console.log(user)
                if (user.is_approved === true) {
                    return checkPassword(password, user.password);
                } else {
                    throw new AppError(errors.ERR_USER_NOT_APPROVED);
                }
            } else {
                throw new AppError(errors.ERR_USER_NOT_FOUND);
            }
        })
        .then(() => {
            return knex(tables.TABLE_USERS)
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