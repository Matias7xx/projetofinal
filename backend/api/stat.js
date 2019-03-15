//Retornar estatísticas do Dashboard
module.exports = app => {
    const Stat = app.mongoose.model('Stat', { //Informações retornadas
        users: Number,
        categories: Number,
        articles: Number,
        createdAt: Date
    })

    //Obter a última estatística do MongoDB
    const get = (req, res) => {
        Stat.findOne({}, {}, { sort: { 'createdAt' : -1} }) //{Objeto filtrado}, {Selecionar atributos}, { sort que pega a última estatística cadastrada de forma decrescente}
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    categories: 0,
                    articles: 0
                }
                res.json(stat || defaultStat)
            })
    }

    return { Stat, get }
}