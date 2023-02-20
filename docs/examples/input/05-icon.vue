<template>
    <byte-input v-model="inputVal1" :prefix-icon="Search" style="margin-bottom: 10px;"></byte-input>
    <byte-input v-model="inputVal2" :suffix-icon="Calendar" ></byte-input>
</template>
<script lang="ts" setup>
import { Calendar,Search } from '@element-plus/icons-vue';
import {ref} from 'vue'
const inputVal1 = ref('')
const inputVal2 = ref('')
</script>