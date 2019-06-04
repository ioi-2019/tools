module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host: 'localhost',
            port: 5432,
            user: 'cms-rf',
            password: 'cms-rf',
            database: 'cms-rf'
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