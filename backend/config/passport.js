const { authSecret } = require('../.env') //Ler o token para validar se o auth é correto
const passport = require('passport') //Framework para validar
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = { //Parametros da estratégia
        secretOrKey: authSecret, //Segredo decodificador
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() //Procura o token no cabeçalho da requisição para extrair 
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('users') //Obter usuário
            .where({ id: payload.id })
            .first()
            .then(user => done(null, user ? { ...payload } : false))
            .catch(err => done(err, false))
    })

    passport.use(strategy) //Setando a estratégia que o passport vai usar(automatizar)

    return { //Método para filtrar requisições que precisam passar pelo passport
        authenticate: () => passport.authenticate('jwt', { session: false })
        
    }
}