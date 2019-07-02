module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host: 'localhost',
            port: 5432,
            user: 'cms_rf',
            password: 'cms_rf',
            database: 'cms_rf'
        },
        migrations: {
            directory: __dirname + '/db/migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    },
    cms: {
        client: 'postgresql',
        connection: {
            host: 'localhost',
            port: 5432,
            user: 'cmsuser',
            password: 'cmsuser123',
            database: 'cmsdb'
        }
    }
};