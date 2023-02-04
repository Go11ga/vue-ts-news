<template>
    <div style="display: none">

        <svg id="icon_list" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <rect width="18" height="8"/>
            <rect y="10" width="18" height="8"/>
        </svg>

        <svg id="icon_grid" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <rect width="8" height="8"/>
            <rect y="10" width="8" height="8"/>
            <rect x="10" width="8" height="8"/>
            <rect x="10" y="10" width="8" height="8"/>
        </svg>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'VTNSprite'
})
</script>
