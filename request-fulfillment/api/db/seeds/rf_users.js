const { hashPassword } = require('../../helpers/auth/hasher');
const tables = require('../../helpers/constants/tables');

exports.seed = (knex) => {
    return knex(tables.TABLE_USERS)
        .del()
        .then(() => {
            return hashPassword('admin');
        })
        .then((hash) => {
            return knex(tables.TABLE_USERS)
                .insert([
                    {
                        username: 'admin',
                        first_name: 'Admin',
                        last_name: 'Admin',
                        password: hash,
                        is_admin: true,
                        is_superadmin: true,
                        is_approved: true
                    }
                ]);
        });
};
