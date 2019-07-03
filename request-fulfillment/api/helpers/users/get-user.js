const { knexRF } = require('../../db/config');
const { tables } = require('../constants');

const getUserById = (id) => {
    return getUser({
        id: id
    });
};

const getUserByUsername = (username) => {
    return getUser({
        username: username
    });
};

const getUser = (params) => {
    return knexRF(tables.TABLE_USERS)
        .select('*')
        .where(params)
        .first()
        .then((user) => {
            return Promise.resolve(user);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

module.exports = {
    getUserById,
    getUserByUsername
};