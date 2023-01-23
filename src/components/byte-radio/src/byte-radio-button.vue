<script setup lang="ts">
import ByteRadio from "./byte-radio.vue";
interface RadioButtonProps {
  label: string | number | boolean | object;
  trueLabel?: string | number;
  falseLabel?: string | number;
  disabled?: boolean;
  name?: string;
  checked?: boolean;
}
const props = defineProps<RadioButtonProps>();
</script>

<template>
  <!-- 复用 byte-radio，这里多加一个属性 is-button 即可-->
  <ByteRadio
      class="hasBorder"
      :label="label"
      :true-label="trueLabel"
      :false-label="falseLabel"
      :disabled="disabled"
      :name="name"
      :checked="checked"
      :is-button="true"
  >
    <slot></slot>
  </ByteRadio>
</template>

<style lang="less">
// 对首尾的button样式进行规定
.hasBorder:first-of-type {
  border-radius: 3px 0 0 3px;
}
.hasBorder:last-child {
  border-radius: 0 3px 3px 0;
}
</style>
