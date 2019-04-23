<template>
    <div class="news-item">
        <router-link :to="{ name: 'newsById', params: { id: news.id } }">
            <div class="news-item-image d-none d-sm-block">
                <img v-if="news.imageUrl"
                    :src="news.imageUrl"
                    height="150" width="150" alt="News">
                <img v-else
                    src="@/assets/article.png"
                    height="150" width="150" alt="News">
            </div>
            <div class="news-item-info">
                <h2>{{ news.name }}</h2>
                <p>{{ news.description }}</p>
                <span class="news-item-author">
                    <strong>Data da Publicação: </strong>{{ format_date(news.createdAt) }}
                </span>
            </div>
        </router-link>
    </div>
</template>

<script>
import moment from 'moment'
moment.locale('pt-BR');

export default {
    name: 'NewsItem',
    props: ['news', 'author'],
    methods: { 
        format_date(value){
            if (value) {
            return moment(String(value)).format('LLLL')
            }
        }
    }
}
</script>

<style>
    .news-item {
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: #FFF;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .news-item a {
        display: flex;
        align-items: flex-start;
        text-decoration: none;
        color: #000;
    }

    .news-item-info h2 {
        font-size: 1.7rem;
    }

    .news-item-image {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #AAA;
    }

    .news-item-image img {
        border-radius: 5px;
    }

    .news-item-info {
        display: flex;
        align-self: stretch;
        flex-direction: column;
    }

    .news-item-info p {
        flex: 1;
        color: #555;
        font-size: 1.1rem;
    }
</style>
