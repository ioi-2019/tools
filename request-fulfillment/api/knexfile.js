require('dotenv').config();

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host: process.env.DB_DEV_HOST,
            port: process.env.DB_DEV_PORT,
            database: process.env.DB_DEV_NAME,
            user: process.env.DB_DEV_USER,
            password: process.env.DB_DEV_PASS
        },
        migrations: {
            directory: __dirname + '/db/migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            host: process.env.DB_PROD_HOST,
            port: process.env.DB_PROD_PORT,
            database: process.env.DB_PROD_NAME,
            user: process.env.DB_PROD_USER,
            password: process.env.DB_PROD_PASS
        },
        migrations: {
            directory: __dirname + '/db/migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    }
};