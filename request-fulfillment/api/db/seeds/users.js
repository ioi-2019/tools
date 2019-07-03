const { hashPassword } = require('../../helpers/auth/hasher');

exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(() => {
      return hashPassword('admin')
        .then((hash) => {
          return knex('users')
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
              }
            ]);
        });
    });
};
