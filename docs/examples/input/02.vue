<template>
    <byte-input v-model="inputVal" disabled></byte-input>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
const inputVal = ref('disabled状态')
</script>