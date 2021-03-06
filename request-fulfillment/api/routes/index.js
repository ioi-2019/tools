const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/*', (req, res, next) => {
	res.setHeader('Last-Modified', (new Date()).toUTCString());
	next();
});

module.exports = router;
