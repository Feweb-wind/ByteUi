<template>
    <byte-input v-model="inputVal" :maxlength="5" show-word-limit></byte-input>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
const inputVal = ref('')
</script>
<style>
.box{
    display: flex;
    flex-direction: column;
}
</style>