<template>
    <div class="header">

        <div class="header__item-about">
            <h1 class="header__title">
                Список новостей
            </h1>

            <button class="header__refresh-btn" @click="updateNews">
                <img class="header__refresh-img" src="@/assets/images/refresh.png" alt="refresh">
            </button>
        </div>

        <div class="header__item-search">   
            <label class="header__input-label">
                <input 
                    class="header__input" 
                    v-model.trim="searchValue" 
                    @keyup.enter="searchNews"
                >
                <button class="header__search-btn" @click="searchNews">
                    <img class="header__preloader-img" src="@/assets/images/search_preloader.gif" v-if="news.newsProcess">
                    <img class="header__search-img" src="@/assets/images/search.png" v-else>
                </button>
            </label>
        </div>

    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default defineComponent({
    name: 'VTNHeader',

    data() {
        return {
            searchValue: ''
        }
    },

    computed: {
        ...mapState([
            'news'
        ])
    },

    methods: {
        ...mapMutations([
            'CLEAR_NEWS',
            'SET_SEARCH_VALUE'
        ]),

        ...mapActions([
            'fetchNews'
        ]),

        updateNews() {
            this.CLEAR_NEWS()
            this.fetchNews()
        },

        searchNews() {
            this.SET_SEARCH_VALUE(this.searchValue)
            this.fetchNews()
        }
    }
})
</script>
