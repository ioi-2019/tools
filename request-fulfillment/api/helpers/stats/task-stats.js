const { knex } = require('../../db/config');
const tables = require('../constants/tables');

const allStats = () => {
    return knex(tables.TABLE_TASKS)
        .select('*')
        .then((tasks) => {
            return Promise.resolve(tasks);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

module.exports = {
    allStats
};