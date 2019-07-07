const { knexRF } = require('../../db/config');
const tables = require('../constants/tables');

const allStats = () => {
    return knexRF(tables.TABLE_USERS)
        .select('*')
        .then((users) => {
            return Promise.resolve(users);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

module.exports = {
    allStats
};