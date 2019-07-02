const { knexRF } = require('../../db/config');
const { tables } = require('../constants');

module.exports = () => {
    return knexRF(tables.TABLE_USERS)
        .select('*')
        .then((users) => {
            return Promise.resolve(users);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};