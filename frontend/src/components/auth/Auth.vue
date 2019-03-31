<template>
    <div class="auth-content">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <div class="auth-modal">
            <div class="auth-img">
            <img id="logo" src="@/assets/logo.png" width="100" alt="Logo" />
            <label>nowledge</label>
            </div>
            <hr>
            <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

            <input v-if="showSignup" v-model="user.name" type="text" placeholder="Nome">
            <input v-model="user.email" name="email" type="text" placeholder="E-mail">
            <input v-model="user.password" name="password" type="password" placeholder="Senha">
            <input v-if="showSignup" v-model="user.confirmPassword"
                type="password" placeholder="Confirme a Senha">

            <button v-if="showSignup" @click="signup">Registrar</button>
            <button v-else @click="signin">Entrar</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Possui cadastro? Faça o Login!</span>
                <span v-else>Não possui cadastro? Registre-se aqui!</span>
            </a>
        </div>
    </div>
</template>

<script> //Componente para tela de Cadastro e tela de Login
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'


export default {
    name: 'Auth',
    data: function() {
        return {
            showSignup: false, //Flag para alternar entre tela de Cadastro e Login. Se FALSE = Login, Se TRUE = Cadastro
            user: {} //Usuário armazenado
        }
    },
    methods: {
        signin() { //Login
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data) //Setar Login no store da aplicação
                    localStorage.setItem(userKey, JSON.stringify(res.data)) //Converter objeto para persistir no Local Storage
                    this.$router.push({ path: '/' }) //Navegação para o raiz da aplicação
                })
                .catch(showError)
        },
        signup() { //Cadastro
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                    this.showSignup = false
                })
                .catch(showError)
        }
    }
}
</script>

<style>

    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #fff;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
    }

    .auth-modal button {
        align-self: flex-end;
        background-color: #2460ae;
        color: #FFF;
        padding: 5px 15px;
    }

    .auth-modal a {
        margin-top: 35px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }

    .auth-modal label {
        font-family: 'Roboto', sans-serif;
        font-size: 41px;
        margin: 1px;
        position: relative;
        top: 6.1vh;
        font-weight: 100;

    background: -webkit-linear-gradient(#eee, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    }
</style>
