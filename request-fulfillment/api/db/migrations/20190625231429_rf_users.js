const tables = require('../../helpers/constants/tables');

exports.up = (knex) => {
    return knex.schema.createTable(tables.TABLE_USERS, (table) => {
        table.increments('id').primary();
        table.string('username').notNullable().unique();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.boolean('is_admin').notNullable().defaultTo(false);
        table.boolean('is_superadmin').notNullable().defaultTo(false);
        table.boolean('is_approved').notNullable().defaultTo(false);
        table.string('password').notNullable();
        table.string('auth_token');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable(tables.TABLE_USERS);
};
