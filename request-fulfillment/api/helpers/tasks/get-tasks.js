const { knex } = require('../../db/config');
const { tables, errors } = require('../constants');
const AppError = require('../errors/app-error');

const getTaskById = (taskID) => {
    return getTask({
        'q.id': taskID
    });
};

const getTask = (params) => {
    return knex(tables.CMS_TABLE_QUESTIONS + ' as q')
        .select(
            'q.*',
            't.id as task_id',
            't.rf_user_id as task_assignee_id',
            't.created_at as task_created_at',
            't.removed_at as task_removed_at'
        )
        .leftJoin(
            tables.TABLE_TASKS + ' as t',
            'q.id',
            't.question_id'
        )
        .where(params)
        .first()
        .then((task) => {
            if (task) {
                return Promise.resolve(task);
            } else {
                throw new AppError(errors.ERR_TASK_NOT_FOUND);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const getAllTasks = () => {
    return knex(tables.CMS_TABLE_QUESTIONS)
        .select('*')
        .then((tasks) => {
            return Promise.resolve(tasks);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const getPersonalTasks = (userID) => {
    return knex(tables.TABLE_TASKS)
        .select('*')
        .leftJoin(
            tables.CMS_TABLE_QUESTIONS,
            tables.TABLE_TASKS + '.question_id',
            tables.CMS_TABLE_QUESTIONS + '.id'
        )
        .leftJoin(
            tables.CMS_TABLE_PARTICIPATIONS,
            tables.CMS_TABLE_QUESTIONS + '.participation_id',
            tables.CMS_TABLE_PARTICIPATIONS + '.id'
        )
        .leftJoin(
            tables.CMS_TABLE_USERS,
            tables.CMS_TABLE_PARTICIPATIONS + '.user_id',
            tables.CMS_TABLE_USERS + '.id'
        )
        .where({
            rf_user_id: userID,
            removed_at: null
        })
        .then((tasks) => {
            return Promise.resolve(tasks);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const getNewTasks = () => {
    // TODO: do we really need to add assigned person to this query?
    return knex(tables.CMS_TABLE_QUESTIONS + ' as q')
        .select(
            'q.id',
            'u.username as contestand_username',
            'q.subject',
            'q.question_timestamp'
        )
        .leftJoin(
            tables.CMS_TABLE_PARTICIPATIONS + ' as p',
            'q.participation_id',
            'p.id'
        )
        .leftJoin(
            tables.CMS_TABLE_USERS + ' as u',
            'p.user_id',
            'u.id'
        )
        .whereNull('admin_id')
        .orderBy('q.question_timestamp', 'asc')
        .then((tasks) => {
            return Promise.resolve(tasks);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const getCompletedTasks = () => {
    // TODO: specificly, what is the problem here? just admin_id != NULL or extra reply_timestamp != NULL ??
    // what if someone assigned task to himself, then wrote reply to question and then unassigned that task?
    // should we block that functionality in front and back so that if one question has reply message,
    // block the request to unassign that question?
    return knex(tables.CMS_TABLE_QUESTIONS)
        .select('*')
        .then((tasks) => {
            return Promise.resolve(tasks);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

module.exports = {
    getAllTasks,
    getPersonalTasks,
    getNewTasks,
    getCompletedTasks,
    getTaskById
};