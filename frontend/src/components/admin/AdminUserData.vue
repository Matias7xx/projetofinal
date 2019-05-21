<template>
    <div class="admin-user-data">
        <PageTitle icon="fa fa-cogs" main="Dados do Usuário"
            sub="Alteração" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Nome do Usuário" active>
                        <NameAdmin />
                    </b-tab>
                    <b-tab title="Senha do Usuário" >
                        <PasswordAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>      
        </div>
    </div>
</template>

<script>
//Agrupar páginas de administração de cadastros
import PageTitle from '../template/PageTitle'
import NameAdmin from './NameAdmin'
import PasswordAdmin from './PasswordAdmin'

export default {
    name: 'AdminUserData',
    components: { PageTitle, NameAdmin, PasswordAdmin }
}
</script>

<style>

</style>
