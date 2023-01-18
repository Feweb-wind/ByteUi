<script setup lang="ts">
import ByteCheckbox from "./byte-checkbox.vue";
interface CheckboxButtonProps {
  label: string | number | boolean | object;
  trueLabel?: string | number;
  falseLabel?: string | number;
  disabled?: boolean;
  name?: string;
  checked?: boolean;
}
const props = defineProps<CheckboxButtonProps>();
</script>

<template>
  <ByteCheckbox
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
  </ByteCheckbox>
</template>

<style lang="less">
.hasBorder:first-of-type {
  border-radius: 5px 0 0 5px;
}
.hasBorder:last-child {
  border-radius: 0 5px 5px 0;
}
</style>
