<template>
    <byte-rate v-model="rateValue" :color="colors"></byte-rate>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
const rateValue = ref()
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])
</script>