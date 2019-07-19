const { knex } = require('../../db/config');
const { tables } = require('../constants');

const getAllUsers = () => {
    return knex(tables.TABLE_USERS)
        .select(
            'id',
            'username',
            'first_name',
            'last_name',
            'is_admin',
            'is_superadmin',
            'is_approved'
        )
        .then((users) => {
            return Promise.resolve(users);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const getActiveUsers = () => {
    return knex(tables.TABLE_USERS)
        .select(
            'id',
            'username',
            'first_name',
            'last_name',
            'is_admin',
            'is_superadmin'
        )
        .where('is_approved', true)
        .then((users) => {
            return Promise.resolve(users);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const getPendingUsers = () => {
    return knex(tables.TABLE_USERS)
        .select(
            'id',
            'username',
            'first_name',
            'last_name'
        )
        .where('is_approved', false)
        .then((users) => {
            return Promise.resolve(users);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const searchUsers = (query) => {
    return knex(tables.TABLE_USERS)
        .select(
            'id',
            'username',
            'first_name',
            'last_name'
        )
        .where('username', 'like', `%${query}%`)
        .orWhere('first_name', 'like', `%${query}%`)
        .orWhere('last_name', 'like', `%${query}%`)
        .then((users) => {
            return Promise.resolve(users);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

module.exports = {
    getAllUsers,
    getActiveUsers,
    getPendingUsers,
    searchUsers
};