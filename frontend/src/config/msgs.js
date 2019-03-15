//Mensagens de validação
import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome', //Biblioteca de itens
    duration: 3000 //3 SEGUNDOS
})

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realizada com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Erro inesperado.' : payload.msg,
    { type: 'error', icon: 'times' }
)