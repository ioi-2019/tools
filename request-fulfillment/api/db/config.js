const envRF = process.env.NODE_ENV || 'development';
const envCMS = 'cms';
const configRF = require('../knexfile')[envRF];
const configCMS = require('../knexfile')[envCMS];

module.exports.knexRF = require('knex')(configRF);
module.exports.knexCMS = require('knex')(configCMS);