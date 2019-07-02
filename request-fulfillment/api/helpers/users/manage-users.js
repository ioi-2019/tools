const { knexRF } = require('../../db/config');
const { tables } = require('../constants');

const approveUser = (id) => {
    return knexRF(tables.TABLE_USERS)
        .update('is_approved', true)
        .where('id', id)
        .returning('*')
        .then((user) => {
            console.log(user);
            return Promise.resolve();
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const rejectUser = (id) => {
    return knexRF(tables.TABLE_USERS)
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
    return knexRF(tables.TABLE_USERS)
        .update('is_admin', true)
        .where({
            id: id,
            is_approved: true
        })
        .returning('*')
        .then((user) => {
            console.log(user);
            return Promise.resolve();
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const takeAdminPrivilege = (id) => {
    return knexRF(tables.TABLE_USERS)
        .update('is_admin', false)
        .where({
            id: id,
            is_approved: true,
            is_superadmin: false
        })
        .returning('*')
        .then((user) => {
            console.log(user);
            return Promise.resolve();
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