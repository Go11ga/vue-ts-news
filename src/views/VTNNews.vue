<template>
    <div class="vtn-news">

        <VTNPreloader v-if="news.newsProcess && !news.news.length"/>

        <template v-if="news.news.length">
            <VTNNewsItem
                v-for="item, idx in news.news"
                :key="idx"
                :newsItem="item"
            />

            <VTNPagination :currentPage="+page" :totalCount="totalNewsPages" />
        </template>

        <div class="vtn-news__empty" v-if="!news.newsProcess && !news.news.length">
            Новостей нет
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import VTNPreloader from '@/components/VTNPreloader.vue'
import VTNNewsItem from '@/components/VTNNewsItem.vue'
import VTNPagination from '@/components/ui/VTNPagination.vue'

export default defineComponent({
    name: 'VTNNews',

    props: {
        channel: {
            type: String,
            required: true
        },
        page: {
            type: String,
            required: true
        },
    },

    components: {
        VTNPreloader,
        VTNNewsItem,
        VTNPagination
    },

    computed: {
        ...mapState([
            'news'
        ]),

        totalNewsPages() {
            return Math.ceil(this.news.totalResults / this.news.newsPerPage)
        },

        pageRoute() {
            return {
                channel: this.channel,
                page: this.page
            }
        }
    },

    methods: {
        ...mapMutations([
            'SET_ACTIVE_CHANNEL',
            'SET_CURRENT_PAGE'
        ]),

        ...mapActions([
            'fetchNews'
        ])
    },

    mounted() {
        this.SET_ACTIVE_CHANNEL(this.channel)
        this.fetchNews()
    },

    watch: {
        pageRoute: {
            handler({ channel, page }) {
                this.SET_ACTIVE_CHANNEL(channel)
                this.SET_CURRENT_PAGE(+page)
                this.fetchNews()
            },
            deep: true
        }
    }
})
</script>
