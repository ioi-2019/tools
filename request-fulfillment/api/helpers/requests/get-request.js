const { knexRF, knexCMS } = require('../../db/config');
const { tables } = require('../constants');

const getRequestById = (id) => {
    return getRequest({
        id: id
    });
};

const getRequest = (params) => {
    return knexCMS(tables.CMS_TABLE_REQUESTS)
        .select('*')
        .where(params)
        .first()
        .then((request) => {
            return Promise.resolve(request);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

module.exports = {
    getRequestById
};