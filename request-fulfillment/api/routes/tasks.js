const express = require('express');
const router = express.Router();
const { checkUser } = require('../middleware/auth');
const { getTasks, manageTasks } = require('../helpers/tasks');
const { getUser } = require('../helpers/users');

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

router.get('/personal', (req, res, next) => {
    const { username } = req.query;
    getUser.getUserByUsername(username)
        .then((user) => {
            return getTasks.getPersonalTasks(user.id);
        })
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

router.get('/new', (req, res, next) => {
    getTasks.getNewTasks()
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

router.get('/completed', (req, res, next) => {
    getTasks.getCompletedTasks()
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
    const taskID = req.params.id;
    getTasks.getTaskById(taskID)
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
    const taskID = req.params.id;
    const { username, reply_subject, reply_text } = req.body;
    manageTasks.replyTask(taskID, { username, reply_subject, reply_text })
        .then(() => {
            res.status(200).json({
                status: 'success'
            });
        })
        .catch((err) => next(err));
});

router.post('/:id/manage/assign', (req, res, next) => {
    const taskID = req.params.id;
    const { user_id } = req.body;
    manageTasks.assignUser(taskID, user_id)
        .then(() => {
            res.status(200).json({
                status: 'success'
            });
        })
        .catch((err) => next(err));
});

router.post('/:id/manage/unassign', (req, res, next) => {
    const taskID = req.params.id;
    const { user_id } = req.body;
    manageTasks.unassignUser(taskID, user_id)
        .then(() => {
            res.status(200).json({
                status: 'success'
            });
        })
        .catch((err) => next(err));
});

module.exports = router;
