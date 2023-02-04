<template>
    <div class="vtn-controls">
        <nav class="vtn-controls__nav">
            <router-link
                v-for="item in news.channels"
                :key="item.id"
                :to="`/${item.code}/1`"
                class="vtn-controls__link"
                :class="{ 'vtn-controls__link--active' : activeLink(item.code) }" 
            >
                {{ item.title }}
            </router-link>
        </nav>

        <div class="vtn-controls__item">
            <button
                v-for="item in modeBtns"
                :key="item.id"
                @click="setView(item.mode)"
                class="vtn-controls__btn"
                :class="{'vtn-controls__btn--active' : item.isActive}"
            >
                <svg class="vtn-controls__icon">
                    <use :xlink:href="`#icon_${item.mode}`"></use>
                </svg>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex'
import { IViewBtns } from '@/types/interfaces'

export default defineComponent({
    name: 'VTNControls',

    data() {
        return {
            modeBtns: [
                {id: 1, mode: 'grid', isActive: true},
                {id: 2, mode: 'list',  isActive: false}
            ] as Array<IViewBtns>
        }
    },

    computed: {
        ...mapState([
            'news'
        ])
    },

    methods: {
        ...mapMutations([
            'SET_VIEW_MODE'
        ]),

        setView(mode: string): void {
            let idx = this.modeBtns.findIndex(el => el.mode === mode)

            this.modeBtns.forEach((el) => el.isActive = false)
            this.modeBtns[idx].isActive = true

            localStorage.setItem('VTNViewMode', mode)

            this.SET_VIEW_MODE(mode)
        },

        activeLink(path: string): boolean {
            return path === this.news.activeChannel 
        }
    },

    created() {
        let viewMode = localStorage.getItem('VTNViewMode') || 'grid'

        this.setView(viewMode)
    }
})
</script>
