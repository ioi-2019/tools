const tables = require('../../helpers/constants/tables');

exports.up = (knex) => {
    return knex.schema.createTable(tables.TABLE_FILTERS, (table) => {
        table.increments('id').primary();
        table.string('name').notNullable().unique();
        table.string('code').notNullable().unique();
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable(tables.TABLE_FILTERS);
};
