(function (routeConfig) {

    'use strict';

    routeConfig.init = (app) => {

        // *** routes *** //
        const indexRouter = require('../routes/index');
        const authRouter = require('../routes/auth');
        const usersRouter = require('../routes/users');
        const tasksRouter = require('../routes/tasks');
        const statsRouter = require('../routes/stats');

        // *** register routes *** //
        app.use('/', indexRouter);
        app.use('/auth', authRouter);
        app.use('/users', usersRouter);
        app.use('/tasks', tasksRouter);
        app.use('/stats', statsRouter);

    };

})(module.exports);