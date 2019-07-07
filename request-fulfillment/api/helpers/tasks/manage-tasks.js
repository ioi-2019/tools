const { knexCMS } = require('../../db/config');
const { tables } = require('../constants');

const REPLY_ADMIN_ID = 1;

const replyTask = (params) => {
    console.log(params);
    console.log(knexCMS.fn.now());
    return knexCMS(tables.CMS_TABLE_QUESTIONS)
        .update({
            reply_timestamp: knexCMS.fn.now(),
            reply_subject: params.reply_subject,
            reply_text: params.reply_text,
            admin_id: REPLY_ADMIN_ID
        })
        .where('id', params.id)
        .then((questions) => {
            console.log(questions);
            return Promise.resolve();
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

module.exports = {
    replyTask
};