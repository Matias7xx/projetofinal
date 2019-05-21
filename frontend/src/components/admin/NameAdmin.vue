<template>
    <div class="name-admin">
        <b-form>
            <input type="hidden" class="user-id" v-model="userdata.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                        v-model="userdata.name" required
                        placeholder="Informe o Nome do Usuário..."/>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary"
                    @click="save">Salvar</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { mapState } from "vuex"; //Mapear usuário na store

export default {
    name: 'NameAdmin',
    data: function() {
        return {
            userdata: {}, //Usuário cadastrado
        }
    },
    computed: mapState(["user"]),
    methods: {
        loadUser() {
            const url = `${baseApiUrl}/useraltername/${this.user.id}` //Para pegar um atributo computado, é necessário usar o THIS
            axios.get(url).then(res => { //get para recuperar usuários
                this.userdata = res.data 
            })
        },
        reset() { //Limpar formulário
            //this.userdata = {}
            this.loadUser()
        },
        save() { //Inserir usuário
            //const method = this.user.id ? 'put' : 'post'
            const id = this.user.id
            axios['put'](`${baseApiUrl}/useraltername/${id}`, this.userdata)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    //this.userdata.password = this.user.password
                    //this.userdata.confirmPassword = this.user.confirmPassword
                    this.reset()
                })
                .catch(showError)
        },
    },
    mounted() { //Quando o componente for carregado, automaticamente o loadUsers será chamado
        this.loadUser()
    }
}
</script>

<style>

</style>