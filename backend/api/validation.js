module.exports = app => {
    //Validações de dados durante as requisições!

    const validator = require('email-validator')

    function existsOrError(value, msg) {  //Nome de matérias, assuntos, etc
        if (!value) throw msg //Se o valor não existe
        if (Array.isArray(value) && value.length === 0) throw msg //Se receber array vazio
        if (typeof value === 'string' && !value.trim()) throw msg //Se receber uma string vazia
    }

    function notExistsOrError(value, msg) { //Validar coisas que não podem existir, como um usuário repetido ao cadastrar no banco
        try {
            existsOrError(value, msg)
        } catch (msg) {
            return  //Caso não exista, apenas retorna
        }
        throw msg //Caso exista, retorna o erro
    }

    function equalsOrError(valueA, valueB, msg) { //Testar igualdade de dois valores::password
        if (valueA !== valueB) throw msg
    }

    function passCaracters(value, msg) {
        if(value.length < 7 ) throw msg
    }

    function checkEmail(value, msg) {
        if(!validator.validate(value)) throw msg
    }

    return { existsOrError, notExistsOrError, equalsOrError, passCaracters, checkEmail }
}