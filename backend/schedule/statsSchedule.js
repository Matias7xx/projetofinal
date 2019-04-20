const schedule = require('node-schedule') //Atualizar e sincronizar o banco de 1 em 1 minuto

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function () { //Rodar o schedule de 10 e 10 minutos
        const usersCount = await app.db('users').whereNull('deletedAt').count('id').first() //Pegando dados do banco
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()
        const newsCount = await app.db('news').count('id').first()

        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {}, //Última estatística
            { sort: { 'createdAt' : -1 } })

        const stat = new Stat({ //Nova estatística que será guardada
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            news: newsCount.count,
            createdAt: new Date()
        })
        //Verificando se houve mudanças nas estatísticas
        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles
        const changeNews = !lastStat || stat.news !== lastStat.news

        if(changeUsers || changeCategories || changeArticles || changeNews) {
            stat.save().then(() => console.log('[Stats] Estatíticas atualizadas!'))
        }
    })
}