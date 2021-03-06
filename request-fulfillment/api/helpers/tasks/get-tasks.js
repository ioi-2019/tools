const axios = require('axios');
const { knex } = require('../../db/config');
const { tables, errors } = require('../constants');
const AppError = require('../errors/app-error');
const { getUserFilters } = require('./filters');

const CONTESTANT_API_IP = process.env.CONTESTANT_API_IP;
const CONTESTANT_API_PORT = process.env.CONTESTANT_API_PORT;
const CONTEST_ID = process.env.CONTEST_ID;

const getTaskById = (taskID) => {
    return getTask({
        'q.id': taskID
    });
};

const getTask = (params) => {
    let task = null;
    return knex(tables.CMS_TABLE_QUESTIONS + ' as q')
        .select(
            'q.*',
            't.id as task_id',
            't.rf_user_id as task_assignee_id',
            't.created_at as task_created_at',
            't.removed_at as task_removed_at',
            't.completed_at as task_completed_at',
            'cms_u.username as contestant_username',
            'cms_u.first_name as contestant_first_name',
            'cms_u.last_name as contestant_last_name',
            'p.ip as contestant_ip',
            'u.username as assignee_username',
            'u.first_name as assignee_first_name',
            'u.last_name as assignee_last_name'
        )
        .leftJoin(
            tables.TABLE_TASKS + ' as t',
            'q.id',
            't.question_id'
        )
        .leftJoin(
            tables.TABLE_USERS + ' as u',
            't.rf_user_id',
            'u.id'
        )
        .leftJoin(
            tables.CMS_TABLE_PARTICIPATIONS + ' as p',
            'q.participation_id',
            'p.id'
        )
        .leftJoin(
            tables.CMS_TABLE_USERS + ' as cms_u',
            'p.user_id',
            'cms_u.id'
        )
        .where(params)
        .first()
        .then((foundTask) => {
            if (foundTask) {
                task = foundTask;
                return getContestantSeat(task.contestant_ip);
            } else {
                throw new AppError(errors.ERR_TASK_NOT_FOUND);
            }
        })
        .then((contestantSeat) => {
            task['contestant_seat'] = contestantSeat;
            if (task.task_completed_at != null) {
                task['status'] = 'completed';
            } else if (task.admin_id == null) {
                task['status'] = 'new';
            } else {
                task['status'] = 'in_progress';
            }
            return Promise.resolve(task);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const getAllTasks = () => {
    return getContestID()
        .then((contestID) => {
            return knex(tables.CMS_TABLE_QUESTIONS + ' as q')
                .select('q.*')
                .leftJoin(
                    tables.CMS_TABLE_PARTICIPATIONS + ' as p',
                    'q.participation_id',
                    'p.id'
                )
                .leftJoin(
                    tables.CMS_TABLE_CONTESTS + ' as c',
                    'p.contest_id',
                    'c.id'
                )
                .where('c.id', contestID);
        })
        .then((tasks) => {
            return Promise.resolve(tasks);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const getPersonalTasks = (userID) => {
    return getContestID()
        .then((contestID) => {
            return knex(tables.TABLE_TASKS + ' as t')
                .select(
                    'q.id',
                    'q.question_timestamp',
                    'q.subject',
                    'u.username as author'
                )
                .leftJoin(
                    tables.CMS_TABLE_QUESTIONS + ' as q',
                    't.question_id',
                    'q.id'
                )
                .leftJoin(
                    tables.CMS_TABLE_PARTICIPATIONS + ' as p',
                    'q.participation_id',
                    'p.id'
                )
                .leftJoin(
                    tables.CMS_TABLE_CONTESTS + ' as c',
                    'p.contest_id',
                    'c.id'
                )
                .leftJoin(
                    tables.CMS_TABLE_USERS + ' as u',
                    'p.user_id',
                    'u.id'
                )
                .where({
                    't.rf_user_id': userID,
                    't.removed_at': null,
                    't.completed_at': null,
                    'c.id': contestID
                });
        })
        .then((tasks) => {
            return Promise.resolve(tasks);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const getNewTasks = (userID) => {
    // TODO: do we really need to add assigned person to this query?
    let filterExp = '';
    return getUserFilters(userID)
        .then((filters) => {
            if (filters.length > 0) {
                filterExp = filters[0].code;
                if (filters.length > 1) {
                    for (let i = 1; i < filters.length; i++) {
                        filterExp = filterExp + '|' + filters[i].code;
                    }
                }
            }
            return getContestID();
        })
        .then((contestID) => {
            return knex(tables.CMS_TABLE_QUESTIONS + ' as q')
                .select(
                    'q.id',
                    'u.username as author',
                    'q.subject',
                    'q.question_timestamp'
                )
                .leftJoin(
                    tables.CMS_TABLE_PARTICIPATIONS + ' as p',
                    'q.participation_id',
                    'p.id'
                )
                .leftJoin(
                    tables.CMS_TABLE_CONTESTS + ' as c',
                    'p.contest_id',
                    'c.id'
                )
                .leftJoin(
                    tables.CMS_TABLE_USERS + ' as u',
                    'p.user_id',
                    'u.id'
                )
                .where('c.id', contestID)
                .where('q.question_timestamp', '>=', '2019-08-07T00:00:00Z')
                .where('q.subject', '~*', filterExp)
                .whereNull('admin_id')
                .orderBy('q.question_timestamp', 'asc');
        })
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
    return getContestID()
        .then((contestID) => {
            return knex(tables.CMS_TABLE_QUESTIONS + ' as q')
                .select(
                    'q.id',
                    'q.question_timestamp',
                    'q.subject',
                    'cms_u.username as author',
                    'u.username as assignee'
                )
                .leftJoin(
                    tables.TABLE_TASKS + ' as t',
                    'q.id',
                    't.question_id'
                )
                .leftJoin(
                    tables.TABLE_USERS + ' as u',
                    't.rf_user_id',
                    'u.id'
                )
                .leftJoin(
                    tables.CMS_TABLE_PARTICIPATIONS + ' as p',
                    'q.participation_id',
                    'p.id'
                )
                .leftJoin(
                    tables.CMS_TABLE_CONTESTS + ' as c',
                    'p.contest_id',
                    'c.id'
                )
                .leftJoin(
                    tables.CMS_TABLE_USERS + ' as cms_u',
                    'p.user_id',
                    'cms_u.id'
                )
                .where('c.id', contestID)
                .whereNotNull('t.completed_at');
        })
        .then((tasks) => {
            return Promise.resolve(tasks);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const getContestID = () => {
    return Promise.resolve(CONTEST_ID);
};

const getContest = () => {
    return knex(tables.CMS_TABLE_CONTESTS)
        .select('*')
        .orderBy('id', 'asc')
        .first()
        .then((contest) => {
            if (contest) {
                return Promise.resolve(contest);
            } else {
                throw new AppError(errors.ERR_CONTEST_NOT_FOUND);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const getContestantSeat = (contestantIP) => {
    return new Promise((resolve, reject) => {
        return Promise.resolve()
            .then(() => {
                contestantIP = contestantIP[0] || '';
                let filteredIP = contestantIP.split('/')[0];
                return filteredIP;
            })
            .then((filteredIP) => {
                return axios.get(`http://${CONTESTANT_API_IP}:${CONTESTANT_API_PORT}/contestant/${filteredIP}`);
            })
            .then((res) => {
                if (!res.data) {
                    throw new Error();
                }
                return resolve(res.data.seat);
            })
            .catch((err) => {
                return resolve('not_found');
            });
    });
};

module.exports = {
    getAllTasks,
    getPersonalTasks,
    getNewTasks,
    getCompletedTasks,
    getTaskById,
    getContestID
};
