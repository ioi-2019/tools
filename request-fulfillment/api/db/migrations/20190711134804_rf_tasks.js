const tables = require('../../helpers/constants/tables');

exports.up = (knex) => {
    return knex.schema.createTable(tables.TABLE_TASKS, (table) => {
        table.increments('id').primary();
        table.integer('question_id').notNullable().unique();
        table.integer('rf_user_id').notNullable();
        table.foreign('question_id').references('id').inTable('questions').onDelete('RESTRICT').onUpdate('CASCADE');
        table.foreign('rf_user_id').references('id').inTable('rf_users').onDelete('RESTRICT').onUpdate('CASCADE');
        table.timestamp('created_at').notNullable();
        table.timestamp('removed_at');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable(tables.TABLE_TASKS);
};
