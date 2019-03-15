<template>
    <div class="user-admin">
        <b-table hover striped :items="users" :fields="fields"></b-table>
    </div>
</template>

<script>
import {baseApiUrl} from '@/global'
import axios from 'axios'

export default {
    name: 'UserAdmin',
    data: function() {
        return {
            mode: 'save', //Alterar entre modos de exclusão e salve
            user: {}, //Usuário cadastrado
            users: [], //Lista de usuários
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
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => { //get para recuperar usuários
                this.users = res.data 
            })
        }
    },
    mounted() { //Quando o componente for carregado, automaticamente o loadUsers será chamado
    this.loadUsers()
    }
}
</script>

<style>

</style>
