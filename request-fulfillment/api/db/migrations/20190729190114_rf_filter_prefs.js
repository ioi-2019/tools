const tables = require('../../helpers/constants/tables');

exports.up = (knex) => {
    return knex.schema.createTable(tables.TABLE_FILTER_PREFS, (table) => {
        table.increments('id').primary();
        table.integer('rf_filter_id').notNullable();
        table.integer('rf_user_id').notNullable();
        table.foreign('rf_filter_id').references('id').inTable(tables.TABLE_FILTERS).onDelete('RESTRICT').onUpdate('CASCADE');
        table.foreign('rf_user_id').references('id').inTable(tables.TABLE_USERS).onDelete('RESTRICT').onUpdate('CASCADE');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable(tables.TABLE_FILTER_PREFS);
};
