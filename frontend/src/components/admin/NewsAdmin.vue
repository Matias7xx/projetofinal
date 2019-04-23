<template>
    <div class="news-admin">
        <b-form>
            <input id="news-id" type="hidden" v-model="newsItem.id" />
            <b-form-group label="Título:" label-for="news-name">
                <b-form-input id="news-name" type="text"
                    v-model="newsItem.name" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Título da Notícia..." />
            </b-form-group>
            <b-form-group label="Descrição" label-for="news-description">
                <b-form-input id="news-description" type="text"
                    v-model="newsItem.description" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe a Descrição da Notícia..." />
            </b-form-group>
            <b-form-group v-if="mode === 'save'"
                label="Imagem (URL):" label-for="news-imageUrl">
                <b-form-input id="news-imageUrl" type="text"
                    v-model="newsItem.imageUrl" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe a URL da Imagem..." />
            </b-form-group>
            <b-form-group v-if="mode === 'save'" 
                label="Autor:" label-for="news-userId">
                <b-form-select id="news-userId"
                    :options="users" v-model="newsItem.userId" />
            </b-form-group>
            <b-form-group v-if="mode === 'save'"
                label="Conteúdo" label-for="news-content">
                <VueEditor v-model="newsItem.content"
                    placeholder="Informe o Conteúdo da Notícia..." />
            </b-form-group>
            <b-button variant="primary" v-if="mode === 'save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="news" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadNew(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadNew(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor" //Editor de texto
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'NewsAdmin',
    components: { VueEditor },
    data: function() {
        return {
            mode: 'save',
            newsItem: {},
            news: [],
            users: [],
            page: 1, //Paginação
            limit: 0,
            count: 0,
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'description', label: 'Descrição', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadNews() {
            const url = `${baseApiUrl}/news?page=${this.page}`
            axios.get(url).then(res => {
                this.news = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        reset() {
            this.mode = 'save'
            this.newsItem = {}
            this.loadNews()
        },
        save() {
            const method = this.newsItem.id ? 'put' : 'post'
            const id = this.newsItem.id ? `/${this.newsItem.id}` : ''
            axios[method](`${baseApiUrl}/news${id}`, this.newsItem)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.newsItem.id
            axios.delete(`${baseApiUrl}/news/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadNew(newsItem, mode = 'save') {
            this.mode = mode
            axios.get(`${baseApiUrl}/news/${newsItem.id}`)
                .then(res => this.newsItem = res.data)
        },
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data.map(user => {
                    return { value: user.id, text: `${user.name} - ${user.email}` }
                })
            })
        }
    },
    watch: {
        page() {
            this.loadNews()
        }
    },
    mounted() {
        this.loadUsers()
        this.loadNews()
    }
}
</script>

<style>

</style>
