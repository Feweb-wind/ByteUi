<template>
  <byte-slider v-model="value" show-input size="large" />
  <byte-slider v-model="value" show-input />
  <byte-slider v-model="value" show-input size="small" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<style scoped>
.byte-slider {
  margin-top: 20px;
}

.byte-slider:first-child {
  margin-top: 0;
}
</style>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .byte-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
