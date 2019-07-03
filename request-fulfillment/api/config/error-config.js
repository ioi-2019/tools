(function (errorConfig) {

    'use strict';

    // *** error handling *** //

    errorConfig.init = (app) => {

        const AppError = require('../helpers/errors/app-error');
        const { errors } = require('../helpers/constants');

        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            const err = new AppError(errors.ERR_NOT_FOUND);
            err.status = 404;
            next(err);
        });

        // development error handler (no stacktraces leaked to user)
        if (app.get('env') === 'development') {
            app.use(function (err, req, res, next) {
                console.log(err.message);
                if (err instanceof AppError) {
                    res.status(200).json({
                        status: 'fail',
                        message: err.message
                    });
                } else {
                    res.status(200).json({
                        status: 'fail',
                        message: errors.ERR_ERROR_OCCURED
                    });
                }
            });
        }

        // production error handler (no stacktraces leaked to user)
        if (app.get('env') === 'production') {
            app.use(function (err, req, res, next) {
                console.log(err.message);
                if (err instanceof AppError) {
                    res.status(200).json({
                        status: 'fail',
                        message: err.message
                    });
                } else {
                    res.status(200).json({
                        status: 'fail',
                        message: errors.ERR_ERROR_OCCURED
                    });
                }
            });
        }
    };

})(module.exports);