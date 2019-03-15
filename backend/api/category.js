module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const category = { ...req.body } //Clonando parametros com spread
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
}