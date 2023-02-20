<template>
    <byte-rate v-model="rateValue" show-text
    :texts="['oops', 'disappointed', 'normal', 'good', 'great']"></byte-rate>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
const rateValue = ref()
</script>