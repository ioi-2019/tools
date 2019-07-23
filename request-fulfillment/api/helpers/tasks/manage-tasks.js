const { knex } = require('../../db/config');
const { tables, errors } = require('../constants');
const { getTaskById } = require('./get-tasks');
const { getUser } = require('../users');
const AppError = require('../errors/app-error');

const replyTask = (taskID, userID, params) => {
    const { first_name, last_name, reply_subject, reply_text } = params;
    return getTaskById(taskID)
        .then((task) => {
            if (task.task_assignee_id === userID) {
                const signature = generateSignature(first_name, last_name);
                const replyText = reply_text + signature;
                return knex(tables.CMS_TABLE_QUESTIONS)
                    .update({
                        reply_timestamp: knex.fn.now(),
                        reply_subject: reply_subject,
                        reply_text: replyText
                    })
                    .where('id', taskID)
                    .whereNotNull('admin_id')
                    .returning('*');
            } else {
                throw new AppError(errors.ERR_CANNOT_REPLY_TASK);
            }
        })
        .then((tasks) => {
            const task = tasks[0];
            if (task) {
                return Promise.resolve();
            } else {
                throw new Error(errors.ERR_ERROR_OCCURED);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const generateSignature = (firstName, lastName) => {
    return `\n\nAnswered by ${firstName} ${lastName}`;
};

const assignUser = (taskID, userID) => {
    return getUser.getCMSAdminID()
        .then((adminID) => {
            return bindAdminToTask(taskID, adminID);
        })
        .then(() => {
            return addTaskAssignee(taskID, userID);
        })
        .then(() => {
            return Promise.resolve();
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const unassignUser = (taskID, userID) => {
    // TODO: Security issue: user with id 2 can unassign user 1 from own task. is it okay?
    return unbindAdminFromTask(taskID)
        .then(() => {
            return removeTaskAssignee(taskID, userID);
        })
        .then(() => {
            return Promise.resolve();
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const completeTask = (taskID, userID) => {
    return knex(tables.TABLE_TASKS)
        .update('completed_at', knex.fn.now())
        .where({
            question_id: taskID,
            rf_user_id: userID
        })
        .returning('*')
        .then((tasks) => {
            const task = tasks[0];
            if (task) {
                return Promise.resolve();
            } else {
                throw new Error(errors.ERR_ERROR_OCCURED);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const bindAdminToTask = (taskID, adminID) => {
    return knex(tables.CMS_TABLE_QUESTIONS)
        .update({
            admin_id: adminID
        })
        .where({
            id: taskID,
            admin_id: null
        })
        .returning('*')
        .then((tasks) => {
            const task = tasks[0];
            if (task) {
                return Promise.resolve();
            } else {
                throw new Error(errors.ERR_ERROR_OCCURED);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const unbindAdminFromTask = (taskID) => {
    return knex(tables.CMS_TABLE_QUESTIONS)
        .update({
            admin_id: null
        })
        .where('id', taskID)
        .whereNotNull('admin_id')
        .returning('*')
        .then((tasks) => {
            const task = tasks[0];
            if (task) {
                return Promise.resolve();
            } else {
                throw new Error(errors.ERR_ERROR_OCCURED);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const addTaskAssignee = (taskID, userID) => {
    // TODO: revise whereNotNull('removed_at') part. possible race condition overall?
    return knex(tables.TABLE_TASKS)
        .select('*')
        .where('question_id', taskID)
        .whereNotNull('removed_at')
        .first()
        .then((task) => {
            if (task) {
                return knex(tables.TABLE_TASKS)
                    .update({
                        rf_user_id: userID,
                        removed_at: null
                    })
                    .where('question_id', taskID)
                    .returning('*');
            } else {
                return knex(tables.TABLE_TASKS)
                    .insert({
                        question_id: taskID,
                        rf_user_id: userID,
                        created_at: knex.fn.now()
                    })
                    .returning('*');
            }
        })
        .then((tasks) => {
            const task = tasks[0];
            if (task) {
                return Promise.resolve();
            } else {
                throw new Error(errors.ERR_ERROR_OCCURED);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const removeTaskAssignee = (taskID, userID) => {
    return knex(tables.TABLE_TASKS)
        .update({
            removed_at: knex.fn.now()
        })
        .where('question_id', taskID)
        .returning('*')
        .then((tasks) => {
            const task = tasks[0];
            if (task) {
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
    replyTask,
    completeTask,
    assignUser,
    unassignUser
};