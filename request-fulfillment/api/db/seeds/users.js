const { hashPassword } = require('../../helpers/auth/hasher');
const tables = require('../../helpers/constants/tables');

exports.seed = function (knex) {
  return knex(tables.TABLE_USERS)
    .del()
    .then(() => {
      return hashPassword('admin')
        .then((hash) => {
          return knex(tables.TABLE_USERS)
            .insert([
              {
                id: 1,
                username: 'admin',
                first_name: 'Admin',
                last_name: 'Admin',
                password: hash,
                is_admin: true,
                is_superadmin: true,
                is_approved: true
              },
              {
                id: 2,
                username: 'user1',
                first_name: 'User1',
                last_name: 'User1',
                password: hash,
                is_admin: false,
                is_superadmin: false,
                is_approved: false
              }
            ]);
        });
    });
};
