<template>
    <div class="user-admin">
        <b-form>
            <input type="hidden" class="user-id" v-model="user.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                        v-model="user.name" required
                        :readonly="mode === 'remove'"
                        placeholder="Informe o Nome do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text"
                        v-model="user.email" required
                        :readonly="mode === 'remove'"
                        placeholder="Informe o E-mail do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-form-checkbox id="user-admin" v-model="user.admin" class="mt-3 mb-3"
            v-show="mode === 'save'" >
                Administrador?
            </b-form-checkbox>
            <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Senha:" label-for="user.password">
                        <b-form-input id="user-password" type="password"
                        v-model="user.password" required
                        placeholder="Informe a Senha do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Confirmação de Senha:"
                    label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password"
                        v-model="user.confirmPassword" required
                        placeholder="Confirme a Senha do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                    @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                    @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <b-table hover striped :items="users" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>    
                <b-button variant="danger" @click="loadUser(data.item, 'remove')" class="mr-2">
                    <i class="fa fa-trash"></i>
                </b-button>   
            </template>    
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'UserAdmin',
    data: function() {
        return {
            mode: 'save', //Alterar entre modos de exclusão e salve
            user: {}, //Usuário cadastrado
            users: [], //Lista de usuários
            page: 1,
            limit: 0,
            count: 0,
            fields: [ //Descrição dos campos
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'admin', label: 'Administrador', sortable: true,
                formatter: value => value ? 'Sim' : 'Não' },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadUsers() { //Carregar usuários do backend
            const url = `${baseApiUrl}/users?page=${this.page}`
            axios.get(url).then(res => { //get para recuperar usuários
                this.users = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        reset() { //Limpar formulário
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },
        save() { //Inserir usuário
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''
            axios[method](`${baseApiUrl}/users${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() { //Remover usuário
            const id = this.user.id
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadUser(user, mode = 'save') { //Carregar Usuário no formulário
            this.mode = mode
            this.user = { ...user }  
        }
    },
    watch: {
        page() {
            this.loadUsers()
        }
    },
    mounted() { //Quando o componente for carregado, automaticamente o loadUsers será chamado
    this.loadUsers()
    }
}
</script>

<style>

</style>
