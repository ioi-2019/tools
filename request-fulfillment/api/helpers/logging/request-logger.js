const { knexRF } = require('../../db/config');
const { TABLE_REQUEST_LOGS } = require('../constants/tables');

// TODO: complete

const logReply = (userId, requestId) => {
    return knexRF(TABLE_REQUEST_LOGS)
        .insert({
            user_id: userId,
            request_id: requestId,
            logged_at: knexRF.fn.now()
        })
        .then((requests) => {
            const rows = requests.length;
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