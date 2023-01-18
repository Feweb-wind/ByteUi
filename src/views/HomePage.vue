<template>
<h1>HomePage</h1>
  <button @click="gotoPage('/components')">components</button>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
const router = useRouter();

const gotoPage = (url: string):void => {
  router.push(url);
}
</script>

<style scoped>

</style>