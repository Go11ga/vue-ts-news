<template>
    <div class="vtn-404">
        <div class="vtn-404__code">
            404
        </div>

        <div class="vtn-404__text">
            Страница не найдена
        </div>

        <router-link class="vtn-404__link" to="/">
            На главную
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'

export default defineComponent({
    name: 'VTN404',

    methods: {
        ...mapMutations([
            'SET_ACTIVE_CHANNEL'
        ])
    },

    mounted() {
        this.SET_ACTIVE_CHANNEL('')
    }
})
</script>
