const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];

module.exports.knex = require('knex')(config);