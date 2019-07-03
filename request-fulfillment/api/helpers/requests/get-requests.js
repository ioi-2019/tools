const { knexRF, knexCMS } = require('../../db/config');
const { tables } = require('../constants');

module.exports = () => {
    return knexCMS(tables.CMS_TABLE_REQUESTS)
        .select('*')
        .then((requests) => {
            return Promise.resolve(requests);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};