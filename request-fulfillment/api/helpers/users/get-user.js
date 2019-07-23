const { knex } = require('../../db/config');
const { tables, errors } = require('../constants');
const AppError = require('../errors/app-error');

const ADMIN_ID = process.env.ADMIN_ID;

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
    return knex(tables.TABLE_USERS)
        .select('*')
        .where(params)
        .first()
        .then((user) => {
            if (user) {
                return Promise.resolve(user);
            } else {
                throw new AppError(errors.ERR_USER_NOT_FOUND);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const getCMSAdminID = () => {
    return Promise.resolve(ADMIN_ID);
    /* if (ADMIN_ID != null) {
        return ADMIN_ID;
    } else {
        return getCMSAdmin()
            .then((admin) => {
                return Promise.resolve(admin.id);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    } */
};

const getCMSAdmin = () => {
    // TODO: should we need to add extra params to WHERE ? e.g. permission_all / permission_messaging = true ?
    return knex(tables.CMS_TABLE_ADMINS)
        .select('*')
        .where({
            enabled: true
        })
        .orderBy(tables.CMS_TABLE_ADMINS + '.id', 'asc')
        .first()
        .then((user) => {
            if (user) {
                return Promise.resolve(user);
            } else {
                throw new AppError(errors.ERR_USER_NOT_FOUND);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

module.exports = {
    getUserById,
    getUserByUsername,
    getCMSAdminID
};