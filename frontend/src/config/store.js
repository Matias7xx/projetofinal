//Área de armazenamento para compartilhar ações entre componentes
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { //Estado do Menu
        isMenuVisible: true,
        user: {
            name: 'Usuário',
            email: 'email@gmail.com'
        }
    },
    mutations: { //Funções para manipular dados
        toggleMenu(state, isVisible) { //Alternância do Menu
            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else { //Se passou true ou false
                state.isMenuVisible = isVisible
            }
        }
    }
})