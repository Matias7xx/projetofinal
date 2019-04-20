//Arquivo de rotas, todos os métodos, mapear funções

const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)


    app.route('/users')
        .all(app.config.passport.authenticate()) //Todos os métodos vão passar por esse filtro
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('/users/:id') //Alterar
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById)) //Pegando pela ID
        .delete(admin(app.api.user.remove)) //Remover pela ID


    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.category.get))
        .post(admin(app.api.category.save))

    //Precisa ser passado antes do categories/:id , para o TREE não sobreescrever o ID   
    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(admin(app.api.category.save))
        .delete(admin(app.api.category.remove))

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.article.get))
        .post(admin(app.api.article.save))

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(admin(app.api.article.save))
        .delete(admin(app.api.article.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate()) //Todos os serviços dependem de autenticação(LOGIN)
        .get(app.api.article.getByCategory)

        app.route('/news')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.news.get))
        .post(admin(app.api.news.save))

    app.route('/news/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.news.getById)
        .put(admin(app.api.news.save))
        .delete(admin(app.api.news.remove))

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}