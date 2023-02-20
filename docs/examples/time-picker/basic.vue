<template>
  <div class="example-basic">
    <byte-time-picker v-model="value1" placeholder="Arbitrary time" />
    <byte-time-picker
      v-model="value2"
      arrow-control
      placeholder="Arbitrary time"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value1 = ref()
const value2 = ref()
</script>

<style>
.example-basic .byte-tooltip-slot {
  margin: 8px;
}
</style>
