<<<<<<< HEAD
<script setup lang="ts">
import ByteSlider from './components/byte-slider.vue'
import { ref  } from "vue";
let modelValue = ref(0)
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
  <ByteSlider disabled />
  <ByteSlider v-model="modelValue" :step="2" />
  <p>{{ modelValue }}</p>
=======
<template>
HomePage
  <ByteBorder/>
>>>>>>> main
</template>

<script setup>
import ByteBorder from "./components/byte-border/src/border.vue"
</script>

<style lang="less" scoped>


</style>