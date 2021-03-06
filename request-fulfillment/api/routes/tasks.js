const express = require('express');
const router = express.Router();
const { checkUser } = require('../middleware/auth');
const { getTasks, manageTasks, filters } = require('../helpers/tasks');
const { getUser } = require('../helpers/users');

router.get('/', checkUser(), (req, res, next) => {
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

router.get('/personal', checkUser(), (req, res, next) => {
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

router.get('/new', checkUser(), (req, res, next) => {
    const { username } = req.query;
    getUser.getUserByUsername(username)
        .then((user) => {
            return getTasks.getNewTasks(user.id);
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

router.get('/completed', checkUser(), (req, res, next) => {
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

router.get('/filters', checkUser(), (req, res, next) => {
    const { username } = req.query;
    return getUser.getUserByUsername(username)
        .then((user) => {
            return filters.getFilters(user.id);
        })
        .then((filters) => {
            res.status(200).json({
                status: 'success',
                data: {
                    filters: filters
                }
            });
        })
        .catch((err) => next(err));
});

router.get('/filters/personal', checkUser(), (req, res, next) => {
    const { username } = req.query;
    return getUser.getUserByUsername(username)
        .then((user) => {
            return filters.getUserFilters(user.id);
        })
        .then((filters) => {
            res.status(200).json({
                status: 'success',
                data: {
                    filters: filters
                }
            });
        })
        .catch((err) => next(err));
});

router.post('/filters/personal/manage/add', checkUser(), (req, res, next) => {
    const { username, filter_id } = req.body;
    return getUser.getUserByUsername(username)
        .then((user) => {
            return filters.addUserFilter(filter_id, user.id);
        })
        .then(() => {
            res.status(200).json({
                status: 'success'
            });
        })
        .catch((err) => next(err));
});

router.post('/filters/personal/manage/remove', checkUser(), (req, res, next) => {
    const { username, filter_id } = req.body;
    return getUser.getUserByUsername(username)
        .then((user) => {
            return filters.removeUserFilter(filter_id, user.id);
        })
        .then(() => {
            res.status(200).json({
                status: 'success'
            });
        })
        .catch((err) => next(err));
});

router.get('/:id', checkUser(), (req, res, next) => {
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

router.post('/:id/manage/reply', checkUser(), (req, res, next) => {
    const taskID = req.params.id;
    const { username, reply_subject, reply_text } = req.body;
    return getUser.getUserByUsername(username)
        .then((user) => {
            return manageTasks.replyTask(
                taskID,
                user.id,
                {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    reply_subject,
                    reply_text
                }
            );
        })
        .then(() => {
            res.status(200).json({
                status: 'success'
            });
        })
        .catch((err) => next(err));
});

router.post('/:id/manage/complete', checkUser(), (req, res, next) => {
    const taskID = req.params.id;
    const { username } = req.body;
    return getUser.getUserByUsername(username)
        .then((user) => {
            return manageTasks.completeTask(
                taskID,
                user.id,
                {
                    first_name: user.first_name,
                    last_name: user.last_name
                }
            );
        })
        .then(() => {
            res.status(200).json({
                status: 'success'
            });
        })
        .catch((err) => next(err));
});

router.post('/:id/manage/assign/', checkUser(), (req, res, next) => {
    const taskID = req.params.id;
    const { assignee_username } = req.body;
    return getUser.getUserByUsername(assignee_username)
        .then((user) => {
            return manageTasks.assignUser(taskID, user.id);
        })
        .then(() => {
            res.status(200).json({
                status: 'success'
            });
        })
        .catch((err) => next(err));
});

router.post('/:id/manage/unassign', checkUser(), (req, res, next) => {
    const taskID = req.params.id;
    const { username } = req.body;
    return getUser.getUserByUsername(username)
        .then((user) => {
            return manageTasks.unassignUser(taskID, user.id);
        })
        .then(() => {
            res.status(200).json({
                status: 'success'
            });
        })
        .catch((err) => next(err));
});

module.exports = router;
