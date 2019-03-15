//validar usuário administrador
module.exports = middleware => {
    return (req, res, next) => { //Retorna uma função middleware
        if(req.user.admin){
            middleware(req, res, next) //Middleware só será chamado se o adm for true
        } else {
            res.status(401).send('Usuário não é um administrador.')
        }
    }
}