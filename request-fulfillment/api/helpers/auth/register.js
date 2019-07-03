const { knexRF } = require('../../db/config');
const { tables } = require('../constants');
const { hashPassword } = require('./hasher');

module.exports = (params) => {
    const { username, firstName, lastName, password } = params;
    return hashPassword(password)
        .then((hash) => {
            return knexRF(tables.TABLE_USERS)
                .insert({
                    username: username,
                    first_name: firstName,
                    last_name: lastName,
                    password: hash
                })
                .returning('*');
        })
        .then((users) => {
            if (users.length > 0) {
                return Promise.resolve();
            } else {
                throw new Error('Could not register');
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};