<template>
    <header class="header">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
            <i class="fa fa-lg" :class="icon"></i>
        </a>
        <h1 class="title">
            <img  id="logo" src="@/assets/logo2.png" width="60" alt="Logo" />
            <router-link to="/" v-if="user">{{ title }}</router-link>
            <router-link to="" v-else>{{ title }}</router-link>

        </h1>
        <UserDropdown v-if="!hideUserDropdown" />
    </header>
</template>

<script>
import UserDropdown from './UserDropdown' //Vai controlar o dropdown/Menu de usuário
import { mapState } from 'vuex'

export default {
    name: 'Header',
    components: { UserDropdown },
    props: { //Propriedades do componente
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean
    },
    computed: {
        icon() {
            return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down"
        },
        ...mapState(["user"])
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu') //Chamar função que está dentro de store.js
        }
    }
}
</script>

<style>
    .header{
        grid-area: header;
        /*background: linear-gradient(to right, #1e469a, #49a7c1);*/
        /*origin background-image: radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% );
        /*background-image: radial-gradient( circle farthest-corner at -4% -12.9%,  rgba(74,98,110,1) 0.3%, rgba(30,33,48,1) 90.2% );
        background-image: radial-gradient( circle farthest-corner at 85.4% 50.8%,  rgba(14,72,222,1) 0%, rgba(3,22,65,1) 74.2% );
        /*background: linear-gradient(90deg, rgba(56,77,95,1) 0%, rgba(96,125,139,1) 35%);*/
        background: rgba(52,60,65,1);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title{
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }

    .title a {
        color: #fff;
        text-decoration: none;

        font-size: 40px;
        margin: 1px;
        position: relative;
        top: 2.7vh;
        font-weight: 100;
        background: -webkit-linear-gradient(#eee, #333);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .title a:hover {
        color: #fff;
        text-decoration: none;
    }

    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color: #fff;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
