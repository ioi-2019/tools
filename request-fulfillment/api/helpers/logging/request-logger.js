const { knexRF } = require('../../db/config');
const tables = require('../constants/tables');

// TODO: complete

const logReply = (userId, taskId) => {
    return knexRF(tables.TABLE_TASK_LOGS)
        .insert({
            user_id: userId,
            task_id: taskId,
            logged_at: knexRF.fn.now()
        })
        .then((tasks) => {
            const rows = tasks.length;
            console.log(rows);
            if (rows > 0) {
                return Promise.resolve();
            } else {
                throw new Error('Could not insert log');
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

module.exports = {
    logReply
};