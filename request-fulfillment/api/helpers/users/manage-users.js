const { knex } = require('../../db/config');
const { tables, errors } = require('../constants');

const approveUser = (id) => {
    return knex(tables.TABLE_USERS)
        .update('is_approved', true)
        .where('id', id)
        .returning('*')
        .then((users) => {
            const user = users[0];
            if (user) {
                return Promise.resolve();
            } else {
                throw new Error(errors.ERR_ERROR_OCCURED);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const rejectUser = (id) => {
    return knex(tables.TABLE_USERS)
        .del()
        .where('id', id)
        .then((user) => {
            console.log(user);
            return Promise.resolve();
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const giveAdminPrivilege = (id) => {
    return knex(tables.TABLE_USERS)
        .update('is_admin', true)
        .where({
            id: id,
            is_approved: true,
            is_admin: false,
            is_superadmin: false
        })
        .returning('*')
        .then((users) => {
            const user = users[0];
            if (user) {
                return Promise.resolve();
            } else {
                throw new Error(errors.ERR_ERROR_OCCURED);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const takeAdminPrivilege = (id) => {
    return knex(tables.TABLE_USERS)
        .update('is_admin', false)
        .where({
            id: id,
            is_approved: true,
            is_superadmin: false
        })
        .returning('*')
        .then((users) => {
            const user = users[0];
            if (user) {
                return Promise.resolve();
            } else {
                throw new Error(errors.ERR_ERROR_OCCURED);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

module.exports = {
    approveUser,
    rejectUser,
    giveAdminPrivilege,
    takeAdminPrivilege
};