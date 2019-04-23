<template>
    <div class="news-list">
        <PageTitle icon="fa fa-home" main="Notícias"
            sub="Concurso de admissão no curso de formação de oficiais do quadro complementar (CFO/QC)" />
            <ul>
                <li v-for="news in news" :key="news.id">
                    <NewsItem :news="news" />
                </li>
            </ul>
            <div class="load-more">
                <button v-if="loadMore"
                    class="btn btn-lg btn-outline-primary"
                    @click="getNews">Carregar Mais Notícias</button>
            </div>
    </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import NewsItem from './NewsItem'
import PageTitle from '../template/PageTitle'

export default {
    name: 'NewsList',
    components: { NewsItem, PageTitle },
    data: function() {
        return {
            news: [],
            page: 1,
            loadMore: true //Carregar mais conteúdo
        }
    },
    methods: {
        getNews() {
            const url = `${baseApiUrl}/news?page=${this.page}` //Incrementar o page
            axios(url).then(res => {
                this.news = this.news.concat(res.data.data)
                this.page++

                if(res.data.data.length === 0) this.loadMore = false
            })
        }
    },
    /*watch: { //Alterar rotas do item selecionado no menu
        $route(to) {
            this.news.id = to.params.id
            this.news = []
            this.page = 1
            this.loadMore = true

            this.getNews()
        }
    },*/
    mounted() { //Trazer o artigo na tela
        this.getNews()
    }
}
</script>

<style>
    .news-list ul {
        list-style-type: none;
        padding: 0px;
    }

    .news-list .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
</style>
