<template>
    <div style="display: flex;">
        <byte-switch v-model="value1"></byte-switch>
        <byte-switch v-model="value2"
         active-color="#13ce66"
         inactive-color="#ff4949"></byte-switch>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(true)
const value2 = ref(false)
</script>