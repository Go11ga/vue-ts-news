<template>
    <router-link
        :to="path"
        class="vtn-pagination__item"
        :class="{'vtn-pagination__item--active' : active}"
        @click="onPageChange"
    >
        {{ label }}
    </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'RSSPaginationItem',

    props: {
        label: {
            type: String,
            required: true
        },

        value: {
            type: Number,
            required: true
        },

        active: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        path () {
            const { name, query, params } = this.$route
            const route = {
                name,
                query,
                params: {
                    ...params,
                    page: this.value
                }
            }
            return route
        }
    },

    methods: {
        onPageChange() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }
})
</script>
