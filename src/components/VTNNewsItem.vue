<template>
    <div
        class="vtn-newsitem"
        :class="{ 'vtn-newsitem--list' : news.viewMode === 'list' }"
    >
        <div class="vtn-newsitem__inner">

            <div class="vtn-newsitem__header">
                <a class="vtn-newsitem__title" :href="newsItem.url"  target="_blank">
                    {{ newsItem.title }}
                </a>
            </div>

            <div class="vtn-newsitem__content">
                <img v-if="newsItem.urlToImage" class="vtn-newsitem__img" :src="newsItem.urlToImage" >
                <img v-else class="vtn-newsitem__img" src="https://dummyimage.com/300x168/DCDCDC/fff">

                <div
                    class="vtn-newsitem__text"
                    :class="{'vtn-newsitem__text--height-auto' : heightAuto}"
                >
                    {{ newsItem.description }}
                </div>

                <button
                    v-if="newsItem.description?.length" 
                    class="vtn-newsitem__btn"
                    @click="toggleHeight"
                >
                    Подробнее
                </button>
            </div>

            <div class="vtn-newsitem__footer">
                <a class="vtn-newsitem__channel-link" :href="getLink(newsItem.url)" target="_blank">
                    {{ getLink(newsItem.url) }}
                </a>

                <div class="vtn-newsitem__pubdate">
                    {{ getDate(newsItem.publishedAt) }}
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { INewsItem } from '@/types/interfaces'
import { mapState } from 'vuex'

export default defineComponent({
    name: 'VTNNewsItem',

    props: {
        newsItem: {
            type: Object as PropType<INewsItem>,
            required: true
        }
    },

    data() {
        return {
            heightAuto: false
        }
    },

    computed: {
        ...mapState([
            'news'
        ])
    },

    methods: {
        getLink(url: string): string {
            let strs = url.split('/')

            return `https://${strs[2]}`
        },

        getDate(date: string): string {
            let time = new Date(date)

            return `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`
        },

        toggleHeight() {
            this.heightAuto = !this.heightAuto
        }
    }
})
</script>
