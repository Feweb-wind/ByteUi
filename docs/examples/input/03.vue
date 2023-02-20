<template>
    <byte-input v-model="inputVal" clearable></byte-input>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
const inputVal = ref('')
</script>