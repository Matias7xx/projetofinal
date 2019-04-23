//Configuração de Rotas
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleById from '@/components/article/ArticleById'
import Auth from '@/components/auth/Auth'
import NewsList from '@/components/news/NewsList'
import NewsById from '@/components/news/NewsById'

import { userKey } from '@/global' //Token de usuário para Evitar o /admin por usuários comuns

Vue.use(VueRouter)

const routes = [{ //Rotas
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true } //Só adm entra em /admin
}, {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
}, {
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}, {
    name: 'newsList',
    path: '/news',
    component: NewsList
}, {
    name: 'newsById',
    path: '/news/:id',
    component: NewsById
}]

const router = new VueRouter({ //Instância do VueRouter
    mode: 'history',
    routes
})

router.beforeEach(( to, from, next) => { //Chamado sempre que for navegar de uma rota para outra
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)) { //Registro de rotas
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else {
        next()
    }
})
export default router