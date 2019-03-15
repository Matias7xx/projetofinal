//Configurar middlewares do express
//Body-Parser Interpretar o body da requisição, Textual, Json, etc
//Cors permite que a aplicação backend se conecte com a frontend
//Consign ajuda a fazer dependencias dentro da aplicação
const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app => {
    app.use(bodyParser.json()) //Interpretar Json
    app.use(cors())
}