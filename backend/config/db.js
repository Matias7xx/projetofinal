//Arquivo de configuração do knex(banco)
const config = require('../knexfile.js')
//Instanciar o knex passando o arquivo de configuração
const knex = require('knex')(config)

knex.migrate.latest([config]) //Executa o banco no momento em que carregar o backend
module.exports = knex