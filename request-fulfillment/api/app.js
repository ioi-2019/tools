require('dotenv').config();

const express = require('express');
const appConfig = require('./config/main-config.js');
const routeConfig = require('./config/route-config.js');
const errorConfig = require('./config/error-config.js');

const app = express();

// Enable App
appConfig.init(app, express);

// Enable API Routes
routeConfig.init(app);

// Enable Error Handling
errorConfig.init(app);

console.log('Request Fulfillment API listens...');

module.exports = app;
