//Área de armazenamento para compartilhar ações entre componentes
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { //Estado do Menu
        isMenuVisible: false,
        user: null
    },
    mutations: { //Funções para manipular dados
        toggleMenu(state, isVisible) { //Alternância do Menu
            if(!state.user) { //Se usuário não está setado, não será executado o resto do método 
                state.isMenuVisible = false
                return
            }

            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else { //Se passou true ou false
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user) { //Setar o usuário logado
            state.user = user
            if(user) { //Se usuário setado
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isMenuVisible = true
            } else { //Senão
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})