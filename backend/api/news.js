module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation //Validações

    const save = (req, res) => {
        const news = { ...req.body }
        if (req.params.id) news.id = req.params.id //Se ID tiver setado, será usado

        try {
            existsOrError(news.name, 'Nome não informado')
            existsOrError(news.description, 'Descrição não informada')
            existsOrError(news.userId, 'Autor não informado')
            existsOrError(news.content, 'Conteúdo não informado')
        } catch (msg) {
            res.status(400).send(msg) //Erro do cliente
        }

        if (news.id) { //Alterar
            app.db('news')
                .update(news)
                .where({ id: news.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('news') //Inserir
                .insert(news)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => { //Remover
        try {
            const rowsDeleted = await app.db('news') //Quantidade de linhas excluídas
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Notícia não foi encontrada.') //Passar ID que não existe no banco
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 5 // usado para paginação, no máximo 10 por vez
    const get = async (req, res) => {
        const page = req.query.page || 1 //Selecionando página

        const result = await app.db('news').count('id').first()
        const count = parseInt(result.count)

        app.db('news')
            .select('id', 'name', 'description', 'createdAt', 'imageUrl')
            .limit(limit).offset(page * limit - limit)
            .orderBy('id', 'desc')
            .then(news => res.json({ data: news, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('news')
            .where({ id: req.params.id })
            .first()
            .then(news => {
                news.content = news.content.toString()
                return res.json(news)
            })
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById }

}