<script setup lang="ts">
import ByteSrollbar from './components/scrollbar/index';
import ByteSider from './components/slider/index';
import { ref } from "vue";
let modelValue = ref(0);
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <ByteSider v-model="modelValue"/>
  <p>{{ modelValue }}</p>
  <ByteSrollbar height="200px" always>
    <p v-for="item in 20"> {{ item }}新年快乐，兔年大吉！</p>
  </ByteSrollbar>
</template>

<style lang="less" scoped>
</style>