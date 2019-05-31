<template>
    <div class="password-admin">
        <b-form>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nova Senha:" label-for="user.password">
                        <b-form-input id="user-password" type="password"
                        v-model="userdata.password" required
                        placeholder="Informe a nova Senha..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Confirmação de Senha:"
                    label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password"
                        v-model="userdata.confirmPassword" required
                        placeholder="Confirme a Senha do Usuário..." />
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
    name: 'PasswordAdmin',
    data: function() {
        return {
            userdata: {}, //Usuário cadastrado
            senhaAtual: this.senhaAtual
        }
    },
    computed: mapState(["user"]),
    methods: {
        loadUser() {
            const url = `${baseApiUrl}/useralterpassword/${this.user.id}` //Para pegar um atributo computado, é necessário usar o THIS
            axios.get(url).then(res => { //get para recuperar usuários
                this.userdata = res.data 
            })
        },
        reset() { //Limpar formulário
            this.userdata = {}
        },
        save() { //Inserir usuário
            //const method = this.user.id ? 'put' : 'post'
            const id = this.user.id
            axios['put'](`${baseApiUrl}/useralterpassword/${id}`, this.userdata)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
    },
    mounted() { //Quando o componente for carregado, automaticamente o loadUsers será chamado
        
    }
}
</script>

<style>

</style>