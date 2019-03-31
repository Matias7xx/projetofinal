//Autenticação e lógica de login
const { authSecret } = require('../.env')
const jwt = require('jwt-simple') //Gerar token JWT
const bcrypt = require('bcrypt-nodejs') //Comparar senhas criptografadas

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email && !req.body.password) { //Se email e senha não estiverem presentes
            return res.status(400).send('Informe E-mail e Senha.')
        } else if (!req.body.email) {
            return res.status(400).send('E-mail não informado.')
        } else if (!req.body.password) {
            return res.status(400).send('Senha não informada.')
        }

        const user = await app.db('users') //Obter usuário do banco de dados
            .whereNull('deletedAt')
            .where({ email: req.body.email })
            .first()

        if (!user) return res.status(400).send('Usuário não encontrado.') // Se o usuário não existe, o email não foi cadastrado

        const isMatch = bcrypt.compareSync(req.body.password, user.password) //Comparar senhas criptografadas
        if (!isMatch) return res.status(401).send('Email e/ou Senha inválido(s).') //Se não forem iguais

        const now = Math.floor(Date.now() / 1000) //Capturar data atual

        const payload = { //Conteúdo do token JWT
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now, //Data de geração do TOKEN (emitido em../ issued at...)
            exp: now + (60 * 60 * 24 * 3) //Data de expiração SEG*MIN*HORAS*QTDEDIAS, o token vai durar 3 dias
            //Não vai precisar se logar durante esse tempo/Ficará logado por 3 dias
        }



        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })  //ERRO na promise, pois o authSecret no .env estava vazio
        //}catch(msg){
        //   return res.status(400).send(msg)
        //} 

    }

    const validateToken = async (req, res) => { //Validar o token
        const userData = req.body || null
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (e) {
            //Problema com token(Token expirado, authSecret antigo/diferente)
        }

        res.send(false)
    }

    return { signin, validateToken }}