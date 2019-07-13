const { knex } = require('../../db/config');
const { tables } = require('../constants');
const { hashPassword } = require('./hasher');

module.exports = (params) => {
    const { username, first_name, last_name, password } = params;
    return hashPassword(password)
        .then((hash) => {
            return knex(tables.TABLE_USERS)
                .insert({
                    username: username,
                    first_name: first_name,
                    last_name: last_name,
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