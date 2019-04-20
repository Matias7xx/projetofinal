//Criptografar senha de usuário
const bcrypt = require('bcrypt-nodejs')

module.exports = app => { //representa instância do express
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    //encriptar senha
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt) //Gera o hash da senha
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if(req.params.id) user.id = req.params.id
        //Um usuário comum não pode cadastrar um admin
        if(!req.originalUrl.startsWith('/users')) user.admin = false //Se a url não tiver /user, admin será falso
        if(!req.user || !req.user.admin) user.admin = false //Se não tem ninguém logado ou se a flag admin do usuario for falso, admin será falso

        try{
            existsOrError(user.name, 'Nome não informado.')
            existsOrError(user.email, 'E-mail não informado.')
            //if(!user.id) {
            existsOrError(user.password, 'Senha não informada.')
            existsOrError(user.confirmPassword, 'Confirmação de senha não informada.')
            equalsOrError(user.password, user.confirmPassword,
                'Senhas não conferem.')
            //} else {
            //    if(user.password || user.confirmPassword) {
            //existsOrError(user.password, 'Senha não informada')
            //existsOrError(user.confirmPassword, 'Confirmação de senha inválida')
            //equalsOrError(user.password, user.confirmPassword,
            //    'Senhas não conferem')
            //    }
            // }

            const userFromDB = await app.db('users')
                .where({ email: user.email }).first()
            if(!user.id) {  
            notExistsOrError(userFromDB, 'Usuário já cadastrado.')
            }
        } catch(msg){
            return res.status(400).send(msg) //Erro do client
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if(user.id){ //ID setado
            app.db('users')
                .update(user) //Alterar usuário
                .where({ id: user.id })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send()) //Update feito com sucesso
                .catch(err => res.status(500).send(err))
        }else{ //ID não setado
            app.db('users')
            .insert(user) //Salvar usuário
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
    }

    const get = ( req, res ) => { //Pegar todos os usuários do sistema
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deletedAt')
            .then(users => res.json(users)) //Passando lista de usuários em JSON
            .catch(err => res.status(500).send(err))
    }

    const getById = ( req, res ) => { //Pegar usuário por ID
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .whereNull('deletedAt') //Quando usuário não sofrer Soft Delete
            .first()
            .then(user => res.json(user)) //Passando o usuário JSON
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles') //Usuários com artigos associados não serão excluídos
                .where({ userId: req.params.id })
            notExistsOrError(articles, 'Usuário possui artigos cadastrados.')

            const news = await app.db('news') //Usuários com notícias associadas não serão excluídos
            .where({ userId: req.params.id })
            notExistsOrError(news, 'Usuário possui notícias cadastradas.')

            const rowsUpdated = await app.db('users')
                .update({deletedAt: new Date()})
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado/não existe.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove } //Retorna objeto com cada constante criada
}