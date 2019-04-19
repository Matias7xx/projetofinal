<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="Filtrar..."
                v-model="treeFilter" class="filter-field">
        </div>
        <Tree :data="treeData" :options="treeOptions"
            :filter="treeFilter" ref="tree" />
    </aside>
</template>

<script>
import { mapState } from 'vuex' //Mapear atributo da store dentro do componente
import Tree from 'liquor-tree' //Árvore com os conteúdos
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
    name: "Menu",
    components: { Tree },
    computed: mapState(['isMenuVisible']),
    data: function() {
        return {
            treeFilter: '', //Filtro do INPUT
            treeData: this.getTreeData(),
            treeOptions: {
                propertyNames: { 'text': 'name' }, //Alterando prop text para name
                filter: { emptyText: 'Conteúdo não encontrado' } //Se a busca no filtro não existe
            }
        }
    },
    methods: {
        getTreeData() { //Pegar a árvore de elementos em JSON
            const url = `${baseApiUrl}/categories/tree`
            return axios.get(url).then(res => res.data)
        },
        onNodeSelect(node) { //Carregar matérias ao clicar no menu
            this.$router.push({
                name: 'articlesByCategory',
                params: { id: node.id }
            })
            //Responsividade do Menu com VUE-MQ
            if(this.$mq === 'xs' || this.$mq === 'sm') {
                this.$store.commit('toggleMenu', false)
            }
        }
    },
    mounted() {
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    }
}
</script>

<style>
    .menu{
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);
        /*background: rgba(52,60,65,1);*/
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .menu a,
    .menu a:hover {
        color: #fff;
        text-decoration: none;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .tree-arrow.has-child {
        filter: brightness(2);
    }

    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #aaa;
    }

    .menu .menu-filter i {
        color: #aaa;
        margin-right: 10px
    }

    .menu input {
        color: #CCC;
        font-size: 1.3rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .tree-filter-empty {
        color: #CCC;
        margin-left: 20px;
        font-size: 1.3rem; 
    }
</style>
