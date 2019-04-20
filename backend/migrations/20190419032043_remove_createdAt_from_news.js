exports.up = function(knex, Promise) {
    return knex.schema.table('news', (table) => {
        table.dropColumn('createdAt');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('news', (table) => {
        
    });
};