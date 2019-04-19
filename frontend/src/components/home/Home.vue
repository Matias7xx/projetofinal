<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard"
            sub="Estatísticas" />
        <div class="stats">
            <Stat id="materias" title="Matérias" :value="stat.categories"
                icon="fa fa-book" color="#FFF" />
            <Stat id="assuntos" title="Assuntos" :value="stat.articles"
                icon="fa fa-file" color="#FFF" />
            <Stat id="usuarios" title="Usuários" :value="stat.users"
                icon="fa fa-user" color="#FFF" />
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
    name: 'Home',
    components: { PageTitle, Stat },
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
        background: rgba(0,188,212,1);
    }

    #assuntos {
        /*background: linear-gradient(90deg, rgba(55,217,78,1) 0%, rgba(22,133,11,1) 100%);*/
        background: rgba(255,193,7,1);
    }

    #usuarios {
        /*background: linear-gradient(90deg, rgba(61,103,233,1) 0%, rgba(11,70,172,1) 100%);*/
        background: rgba(97,97,97,1);
    }
</style>
