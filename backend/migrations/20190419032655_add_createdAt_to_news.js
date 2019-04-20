exports.up = function(knex, Promise) {
    return knex.schema.table('news', (table) => {
        table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('news', (table) => {
        table.dropColumn('createdAt');
    });
};