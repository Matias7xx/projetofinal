import Vue from 'vue'

export const userKey = '__knowledge_user' //Chave utilizada no LocalStorage
//Url base para requisições Ajax com Axios
export const baseApiUrl = 'http://localhost:3000' //Primeira maneira de exportar

//Tratar mensagens de erro a partir do catch
export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey } //Segunda maneira de exportar