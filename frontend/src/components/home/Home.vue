<template>
    <div class="home">
        <b-card no-body class="size" v-if="user.admin">
                <b-tabs card>
                    <b-tab title="Dashboard" active>
        <PageTitle icon="fa fa-home" main="Dashboard"
            sub="Estatísticas" />
        <div class="stats">
                    <Stat id="materias" title="Matérias" :value="stat.categories"
                        icon="fa fa-book" color="#FFF" />
                    <Stat id="assuntos" title="Assuntos" :value="stat.articles"
                        icon="fa fa-file-text" color="#FFF" />
                    <Stat id="noticias" title="Notícias" :value="stat.news"
                        icon="fa fa-newspaper-o" color="#FFF" />
                    <Stat id="usuarios" title="Usuários" :value="stat.users"
                        icon="fa fa-user" color="#FFF" />
        </div>
            </b-tab>
            <b-tab title="Notícias">
                <NewsList />
            </b-tab>
                </b-tabs>
            </b-card>

            <div v-else>
                <NewsList />
            </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import NewsList from '../news/NewsList'
import axios from 'axios'
import { baseApiUrl } from '@/global'
import { mapState } from "vuex"; //Mapear usuário na store

export default {
    name: 'Home',
    components: { PageTitle, Stat, NewsList },
    computed: mapState(["user"]),
    data: function() { //Função para obter o estado do backend
        return {
            stat: {} //Qtde Usuarios, materias e assuntos
        }
    },
    methods: {
        getStats() { //Requisição
            axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
        }
    },
    mounted() {
        this.getStats()
    }
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        color: #fff;
    }

    #materias {
        /*background: linear-gradient(90deg, rgba(255,0,83,1) 0%, rgba(158,7,46,1) 100%);*/
        /*background: rgba(0,188,212,1);*/
        background: linear-gradient(60deg, #66bb6a, #43a047);
    }

    #assuntos {
        /*background: linear-gradient(90deg, rgba(55,217,78,1) 0%, rgba(22,133,11,1) 100%);*/
        /*background: rgba(255,193,7,1);*/
        background: linear-gradient(60deg, #ffa726, #fb8c00);
    }

    #noticias {
        /*background: linear-gradient(90deg, rgba(55,217,78,1) 0%, rgba(22,133,11,1) 100%);*/
        /*background: rgba(97,97,97,1);*/
        background: linear-gradient(60deg, #ef5350, #e53935);
    }

    #usuarios {
        /*background: linear-gradient(90deg, rgba(61,103,233,1) 0%, rgba(11,70,172,1) 100%);*/
        /*background: rgb(194, 99, 35);*/
        background: linear-gradient(60deg, #26c6da, #00acc1);
    }

    .size .card-header-tabs {
        margin-right: -21px;
        margin-left: -21px;
    }

    .size .nav-tabs .nav-item {
        margin-bottom: -1px;
        flex-grow: 1;
        text-align: center;
    }
</style>
