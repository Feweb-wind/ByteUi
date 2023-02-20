<template>
  <div style="width: 600px;margin-bottom: 20px;">
    <byte-switch></byte-switch>
    <byte-switch v-model="value2"
         active-color="#13ce66"
         inactive-color="#ff4949"></byte-switch>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import byteSwitch from '@byte-ui/components/byte-switch';
const value2 = ref(true)
</script>

<style lang="less" scoped>
</style>

