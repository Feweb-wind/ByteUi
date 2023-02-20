<template>
    <div class="box">
        <byte-input v-model="inputVal" size="small"></byte-input>
        <byte-input v-model="inputVal" size="defalut"></byte-input>
        <byte-input v-model="inputVal" size="large"></byte-input>
    </div>
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