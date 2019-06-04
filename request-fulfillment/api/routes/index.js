const express = require('express');
const router = express.Router();
const knex = require('../db/config');

router.get('/', (req, res, next) => {
	res.render('index');
});

router.get('/*', (req, res, next) => {
	res.setHeader('Last-Modified', (new Date()).toUTCString());
	next();
});

module.exports = router;
