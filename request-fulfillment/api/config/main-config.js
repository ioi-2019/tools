(function (appConfig) {

    'use strict';

    // *** main dependencies *** //
    const path = require('path');
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const morgan = require('morgan');

    // *** load environment variables *** //
    require('dotenv').config();

    appConfig.init = function (app, express) {

        // *** view engine *** //
        app.use(express.static(path.join(__dirname, '../public')));
        app.set('view engine', 'pug');

        // *** app middleware *** //
        if (process.env.NODE_ENV === 'development') {
            app.use(morgan('dev'));
        }
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use(cors());
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
    };
}
)(module.exports);