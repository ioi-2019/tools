const express = require('express');
const router = express.Router();
const stats = require('../helpers/stats');

router.get('/', (req, res, next) => {
	stats.userStats.allStats()
		.then((stats) => {
			res.status(200).json({
				status: 'success',
				data: {
					stats: stats
				}
			})
		})
		.catch((err) => next(err));
});

module.exports = router;
