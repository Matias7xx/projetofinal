const queries = require('./queries')

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation //Validações

    const save = (req, res) => {
        const article = { ...req.body }
        if (req.params.id) article.id = req.params.id //Se ID tiver setado, será usado

        try {
            existsOrError(article.name, 'Nome não informado')
            existsOrError(article.description, 'Descrição não informada')
            existsOrError(article.categoryId, 'Categoria não informada')
            existsOrError(article.userId, 'Autor não informado')
            existsOrError(article.content, 'Conteúdo não informado')
        } catch (msg) {
            res.status(400).send(msg) //Erro do cliente
        }

        if (article.id) { //Alterar
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('articles') //Inserir
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => { //Remover
        try {
            const rowsDeleted = await app.db('articles') //Quantidade de linhas excluídas
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Artigo não foi encontrado.') //Passar ID que não existe no banco
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 1 // usado para paginação, no máximo 10 por vez
    const get = async (req, res) => {
        const page = req.query.page || 1 //Selecionando página

        const result = await app.db('articles').count('id').first()
        const count = parseInt(result.count)

        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit)
            .then(articles => res.json({ data: articles, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString()
                return res.json(article)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => { //Pegar arquivos por ID para listar na tela principal
        const categoryId = req.params.id 
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId) //Consulta do arquivo queries; pegando todos os filhos da categoria informada
        const ids = categories.rows.map(c => c.id)

        app.db({ a: 'articles', u: 'users' }) //Consultando as 2 tabelas
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' }) //Pegando da tabela articles e users pelo KNEX
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId']) //Igualar as duas tabelas. A ID usuário do artigo deve ser a mesma do User ID (Usuário que a criou)
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getByCategory }

}