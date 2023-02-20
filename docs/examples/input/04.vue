<template>
    <byte-input v-model="inputVal" type="password" show-password></byte-input>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
const inputVal = ref('')
</script>