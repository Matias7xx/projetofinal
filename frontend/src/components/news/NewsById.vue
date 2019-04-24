<template>
    <div class="news-by-id">
        <a class="voltar" @click="goBack">
            <i class="fa fa-chevron-circle-left"></i>
        </a>
        <PageTitle icon="fa fa-newspaper-o" :main="news.name" :sub="news.description" />
        <span class="publication">{{ format_date(news.createdAt) }}</span>
        <div class="news-content" v-html="news.content"></div>
    </div>
</template>

<script>
import 'highlightjs/styles/dracula.css' //Highlight de código fonte
import hljs from 'highlightjs/highlight.pack.js'
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import moment from 'moment'
moment.locale('pt-BR');

export default { //Exibir o artigo
    name: 'NewsById', //Obter artigo a partir do ID para renderizar o mesmo na tela
    components: { PageTitle },
    data: function() {
        return {
            news: {}
        }
    },
    methods: {
    goBack () {
        window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    format_date(value){
            if (value) {
            return moment(String(value)).format('LL')
            }
        }
    },
    mounted() {
        const url = `${baseApiUrl}/news/${this.$route.params.id}`
        axios.get(url).then(res => this.news = res.data)
    },
    updated() { //Aplicando highlight em cada elemento 'pre'
        document.querySelectorAll('.article-content pre.ql-syntax').forEach(e => {
            hljs.highlightBlock(e)
        })
    }
}
</script>

<style>
    .news-content {
        background-color: #FFF;
        border-radius: 8px;
        padding: 25px;
    }

    .news-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: #FFF;
    }

    .news-content img {
        max-width: 100%;
    }

    .news-content :last-child {
        margin-bottom: 0px;
    }

    .voltar i {
        color: rgba(52,60,65,1);
        text-decoration: none;
        font-size: 4rem;
        float: left;
        margin-right: 20px;
    }

    .voltar i:hover {
        color: rgb(41, 106, 212);
        background-color: #efefef;
    }

    .publication {
        margin-left: 20px;
        
    }
</style>
