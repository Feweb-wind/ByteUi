<template>
  <div class="byte-slider">
    <input
      type="range"
      :min="min"
      :max="max"
      :value="modelValue"
      :step="step"
      :disabled="disabled"
    />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  step: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});


</script>
<style lang="less" scoped>
.byte-slider {
  // background-color: #ccc;

  input {
    width: 100%;
    cursor: pointer;
  }
}
</style>
