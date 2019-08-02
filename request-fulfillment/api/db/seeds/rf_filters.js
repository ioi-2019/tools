const tables = require('../../helpers/constants/tables');

exports.seed = (knex) => {
    return knex(tables.TABLE_FILTERS)
        .del()
        .then((hash) => {
            return knex(tables.TABLE_FILTERS)
                .insert([
                    {
                        name: '#water',
                        code: '#water'
                    },
                    {
                        name: '#banana',
                        code: '#banana'
                    },
                    {
                        name: '#apple',
                        code: '#apple'
                    },
                    {
                        name: '#chocolate',
                        code: '#chocolate'
                    },
                    {
                        name: '#cupcake',
                        code: '#cupcake'
                    },
                    {
                        name: '#paper',
                        code: '#paper'
                    },
                    {
                        name: '#wc',
                        code: '#wc'
                    },
                    {
                        name: '#clarification',
                        code: '#clarification'
                    }
                ]);
        });
};
