<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros & Cia" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Notícias" active>
                        <NewsAdmin />
                    </b-tab>
                    <b-tab title="Assuntos" >
                        <ArticleAdmin />
                    </b-tab>
                    <b-tab title="Matérias" >
                        <CategoryAdmin />
                    </b-tab>
                    <b-tab title="Usuários" >
                        <UserAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>      
        </div>
    </div>
</template>

<script>
//Agrupar páginas de administração de cadastros
import PageTitle from '../template/PageTitle'
import ArticleAdmin from './ArticleAdmin'
import CategoryAdmin from './CategoryAdmin'
import UserAdmin from './UserAdmin'
import NewsAdmin from './NewsAdmin'

export default {
    name: 'AdminPages',
    components: { PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin, NewsAdmin }
}
</script>

<style>

</style>
