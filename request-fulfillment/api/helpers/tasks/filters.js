const { knex } = require('../../db/config');
const { tables, errors } = require('../constants');
const AppError = require('../errors/app-error');

const getFilters = (userID) => {
    return knex(tables.TABLE_FILTERS + ' as f')
        .select(
            'f.id',
            'f.name',
            'f.code',
            knex.raw(
                `CASE
                    WHEN fp.id is not null THEN true
                    ELSE false
                END AS enabled`
            )
        )
        .leftJoin(tables.TABLE_FILTER_PREFS + ' as fp', function () {
            this.on('f.id', '=', 'fp.rf_filter_id').andOn('fp.rf_user_id', '=', userID);
        })
        .then((filters) => {
            return Promise.resolve(filters);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const getUserFilters = (userID) => {
    return knex(tables.TABLE_FILTER_PREFS + ' as fp')
        .select(
            'fp.id as fp_id',
            'f.id as f_id',
            'f.name',
            'f.code'
        )
        .leftJoin(
            tables.TABLE_FILTERS + ' as f',
            'fp.rf_filter_id',
            'f.id'
        )
        .where('fp.rf_user_id', userID)
        .then((filterPrefs) => {
            return Promise.resolve(filterPrefs);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const addUserFilter = (filterID, userID) => {
    return knex(tables.TABLE_FILTER_PREFS)
        .del()
        .where({
            rf_filter_id: filterID,
            rf_user_id: userID
        })
        .then(() => {
            return knex(tables.TABLE_FILTER_PREFS)
                .insert({
                    rf_filter_id: filterID,
                    rf_user_id: userID
                });
        })
        .then(() => {
            return Promise.resolve();
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const removeUserFilter = (filterID, userID) => {
    return knex(tables.TABLE_FILTER_PREFS)
        .del()
        .where({
            rf_filter_id: filterID,
            rf_user_id: userID
        })
        .then(() => {
            return Promise.resolve();
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

module.exports.getFilters = getFilters;
module.exports.getUserFilters = getUserFilters;
module.exports.addUserFilter = addUserFilter;
module.exports.removeUserFilter = removeUserFilter;