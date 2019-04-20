exports.up = function(knex, Promise) {
    return knex.schema.createTable('news', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('description', 1000).notNull()
        table.string('imageUrl', 1000)
        table.timestamp('createdAt')
        // .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        // .notNullable().defaultTo(knex.fn.now())
        table.binary('content').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('news')
};