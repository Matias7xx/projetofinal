//importar express
const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')

require('./config/mongodb') //Automaticamente estabelece conexão com o mongo

app.db = db //Importando o Knex com as configs do banco
app.mongoose = mongoose

consign() //gerenciamento de dependências
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)
//Porta de execução
app.listen(3000, () => {
    console.log("Backend executando...")
})