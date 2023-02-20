<template>
    <byte-rate v-model="rateValue" disabled></byte-rate>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
const rateValue = ref(3)
</script>