<template>
    <div v-if="totalCount !== 0" class="vtn-pagination">
        <VTNPaginationItem
            class="vtn-pagination__prev"
            label="Назад"
            :value="currentPage > 1 ? currentPage - 1 : 1"
        />

        <VTNPaginationItem
            v-for="(page, index) in pages"
            :key="index"
            :label="page.label"
            :value="page.value"
            :active="page.value == currentPage"
        />

        <VTNPaginationItem
            class="vtn-pagination__next"
            label="Вперёд"
            :value="currentPage < totalCount ? currentPage + 1 : totalCount"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VTNPaginationItem from '@/components/ui/VTNPaginationItem.vue'
import getPaginationOptions from '@/utils/paginationOptions'
import { PaginationItemOption } from '@/types/interfaces'

export default defineComponent({
    name: 'VTNPagination',

    props: {
        currentPage: {
            type: Number,
            required: true
        },

        totalCount: {
            type: Number,
            required: true
        }
    },

    components: {
        VTNPaginationItem
    },

    computed: {
        pages(): Array<PaginationItemOption> {
            const obj = getPaginationOptions({
                totalPages: this.totalCount,
                currentPage: this.currentPage
            })
            return obj
        }
    }
})
</script>
