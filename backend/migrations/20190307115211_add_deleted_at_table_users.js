//Soft delete de usuários
exports.up = function (knex, Promise) { //Alterar tabela criando coluna
    return knex.schema.alterTable('users', table => {
        table.timestamp('deletedAt') //Timestamp (campo com data, hora, dia, mes, ano, etc) 
    })
};

exports.down = function (knex, Promise) { //Alterar tabela excluindo coluna
    return knex.schema.alterTable('users', table => {
        table.dropColumn('deletedAt')
    })
};
