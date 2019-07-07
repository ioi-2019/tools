const { knexCMS } = require('../../db/config');
const { tables } = require('../constants');

const getTaskById = (id) => {
    return getTask({
        id: id
    });
};

const getTask = (params) => {
    return knexCMS(tables.CMS_TABLE_QUESTIONS)
        .select('*')
        .where(params)
        .first()
        .then((questions) => {
            return Promise.resolve(questions);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const getAllTasks = () => {
    return knexCMS(tables.CMS_TABLE_QUESTIONS)
        .select('*')
        .then((questions) => {
            return Promise.resolve(questions);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

module.exports = {
    getAllTasks,
    getTaskById
};