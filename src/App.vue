<template>
    <div class="layout">
        <header class="layout__header">
            <VTNSprite />

            <VTNHeader />

            <VTNControls />
        </header>

        <main class="layout__main">
            <router-view/>
        </main>

        <footer class="layout__footer">
            <VTNFooter />
        </footer>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VTNSprite from '@/components/VTNSprite.vue'
import VTNHeader from '@/components/VTNHeader.vue'
import VTNControls from '@/components/VTNControls.vue'
import VTNFooter from '@/components/VTNFooter.vue'
import { mapState, mapMutations } from 'vuex'
import { toast } from 'vue3-toastify'
import { IError } from '@/types/interfaces'

export default defineComponent({
    name: 'VTN',

    components: {
        VTNSprite,
        VTNHeader,
        VTNControls,
        VTNFooter
    },

    computed: {
        ...mapState([
            'errors'
        ]),

        getError(): IError {
            return this.errors.error
        }
    },

    methods: {
        ...mapMutations([
            'CLEAR_ERROR'
        ])
    },

    watch: {
        getError(newError) {
            if (Object.keys(newError).length !== 0) {
              
                toast(newError.msg, {
                    autoClose: 5000,
                    type: newError.type
                })

                setTimeout(() => {
                    this.CLEAR_ERROR()
                }, 1000)
            }
        } 
    }
})
</script>

<style lang="scss">
@import '@/assets/style/scss/layout.scss';
@import 'vue3-toastify/dist/index.css';
</style>
