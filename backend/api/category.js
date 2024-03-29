/*module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const category = { 
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId
        } //Clonando parametros com spread
        if (req.params.id) category.id = req.params.id

        try {
            existsOrError(category.name, 'Nome não informado')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (category.id) { //Alterar
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {    //Inserir
            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => { //Remover matérias
        try {
            existsOrError(req.params.id, 'Código da matéria não foi informado')

            const subcategory = await app.db('categories') //Não pode existir subcategoria na hora da remoção de uma matéria
                .where({ parentId: req.params.id })

            notExistsOrError(subcategory, 'Matéria possui subcategorias.')

            const articles = await app.db('articles')     //Não pode existir conteúdo/assunto dentro da categoria na hora da remoção
                .where({ categoryId: req.params.id })
            notExistsOrError(articles, 'Matéria possui conteúdo cadastrado.')

            const rowsDeleted = await app.db('categories')
                .where({ id: req.params.id }).del() //Remove a matéria
            existsOrError(rowsDeleted, 'Matéria não foi encontrada.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const withPath = categories => { //Verificando caminho da categoria(Se tem subcategoria)
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId) //Procurando categoria pai
            return parent.length ? parent[0] : null //Caso não exista retorna null
        }

        const categoriesWithPath = categories.map(category => { //Pega o array de categorias, faz um map para adicionar o caminho
            let path = category.name
            let parent = getParent(categories, category.parentId)

            while (parent) { //Enquanto existir parents ele continua procurando
                path = `${parent.name} > ${path}`
                parent = getParent(categories, parent.parentId)
            }

            return { ...category, path } //Resultado do map
        })

        categoriesWithPath.sort((a, b) => { //Ordenar a lista de categorias em ordem alfabética
            if (a.path < b.path) return -1
            if (a.path > b.path) return 1
            return 0
        })

        return categoriesWithPath //Ordenado
    }

    const get = (req, res) => { //Listar matérias
        app.db('categories')
            .then(categories => res.json(withPath(categories)))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => { //Listar por ID
        app.db('categories')
            .where({ id: req.params.id })
            .first()
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    }

    //Transformar o array de categorias em uma estrutura de árvore
    const toTree = (categories, tree) => {
        if(!tree) tree = categories.filter(c=> !c.parentId) //Filtra apenas quem não tem ParentId
        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id
            parentNode.children = toTree(categories, categories.filter(isChild)) //Chamando função de forma recursiva
            return parentNode
        })
        return tree
    }

    const getTree = (req, res) => { //
        app.db('categories')
            .then(categories => res.json(toTree(withPath(categories)))) //Passa todas as categorias com seu "caminho" para a árvore de categorias
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getTree }
}*/


module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation
    const save = async (req, res) => {
        const category = {
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId
        }
        if (req.params.id) category.id = req.params.id
        try {
            existsOrError(category.name, 'Nome não informado')
            if (category.id && category.parentId) {
                const subcategory = await app.db('categories').where({
                    parentId: category.id
                })
                notExistsOrError(subcategory, 'Matéria possui subcategorias.')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }
        if (category.id) {
            if (category.id == category.parentId) category.parentId = null
            app.db('categories').update(category).where({
                id: category.id
            }).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        } else {
            app.db('categories').insert(category).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        }
    }
    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da Matéria não informado.')
            const subcategory = await app.db('categories').where({
                parentId: req.params.id
            })
            notExistsOrError(subcategory, 'Matéria possui subcategorias.')
            const articles = await app.db('articles').where({
                categoryId: req.params.id
            })
            notExistsOrError(articles, 'Matéria possui artigos.')
            const rowsDeleted = await app.db('categories').where({
                id: req.params.id
            }).del()
            existsOrError(rowsDeleted, 'Matéria não foi encontrada.')
            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }
    const withPath = categories => {
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }
        const categoriesWithPath = categories.map(category => {
            let path = category.name
            let parent = getParent(categories, category.parentId)
            while (parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(categories, parent.parentId)
            }
            return {
                ...category,
                path
            }
        })
        categoriesWithPath.sort((a, b) => {
            if (a.path < b.path) return -1
            if (a.path > b.path) return 1
            return 0
        })
        return categoriesWithPath
    }
    //Está ocorrendo BUG de paginação, pois na hora de cadastrar ou alterar ele está pegando apenas 
    //as matérias da paginação(count) atual!!
    const limit = 25
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('categories').count('id').first()
        const count = parseInt(result.count)

        app.db('categories')
        .limit(limit).offset(page * limit - limit)
        .then(categories => res.json({ data: withPath(categories), count, limit }))
            .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {
        app.db('categories').where({
            id: req.params.id
        }).first().then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    }
    const toTree = (categories, tree) => {
        if (!tree) tree = categories.filter(c => !c.parentId)
        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id
            parentNode.children = toTree(categories, categories.filter(isChild))
            return parentNode
        })
        return tree
    }
    const getTree = (req, res) => {
        app.db('categories').then(categories => res.json(toTree(categories)))
            .catch(err => res.status(500).send(err))
    }
    return {
        save,
        remove,
        get,
        getById,
        getTree
    }
}