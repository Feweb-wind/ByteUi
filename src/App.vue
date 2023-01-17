<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import ByteSelect from "./components/byte-select/byte-select.vue";

import {reactive, ref} from "vue";
const state = reactive({
  options: [
    {
      label: "中国",
      value: "China"
    },
    {
      label: "美国",
      value: "America",
    },
    {
      label: "日本",
      value: "Japan"
    },
    {
      label: "俄罗斯",
      value: "Russia",
    },
    {
      label: "韩国",
      value: "Korea"
    }
  ]
});

const {options} = state;
const selectValue = ref('');
const change = (e: Event) => {
  // console.log({e});
  console.log(selectValue.value)
}
</script>

<template>
  <div>
    <a href="###" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="###" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <router-view></router-view>
  </div>
<!--  <HelloWorld msg="Vite + Vue" />-->
  <ByteSelect :options="options"
              @change="change"
              modelVal="America"
              placeholder="Chose Country"
              v-model="selectValue"
  >
    Please select
  </ByteSelect>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
