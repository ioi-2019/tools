const express = require('express');
const router = express.Router();
const { checkUser } = require('../middleware/auth');
const { getTasks, manageTasks } = require('../helpers/tasks');

router.get('/', (req, res, next) => {
    getTasks.getAllTasks()
        .then((tasks) => {
            res.status(200).json({
                status: 'success',
                data: {
                    tasks: tasks
                }
            });
        })
        .catch((err) => next(err));
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    getTasks.getTaskById(id)
        .then((task) => {
            res.status(200).json({
                status: 'success',
                data: {
                    task: task
                }
            });
        })
        .catch((err) => next(err));
});

router.post('/:id/manage/reply', (req, res, next) => {
    const id = req.params.id;
    const { username, reply_subject, reply_text } = req.body;
    manageTasks.replyTask({ id, username, reply_subject, reply_text })
        .then(() => {
            res.status(200).json({
                status: 'success'
            });
        })
        .catch((err) => next(err));
});

module.exports = router;
