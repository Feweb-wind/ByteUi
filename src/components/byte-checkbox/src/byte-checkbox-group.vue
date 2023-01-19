<script setup lang="ts">
import { computed, provide } from "vue";
const props = defineProps({
  modelValue: {
    type: Array<number | string>,
    default: () => [],
  },
  min: Number,
  max: Number,
  disabled: Boolean,
});
const emits = defineEmits(["update:modelValue", "change"]);
const modelValue = computed(() => props.modelValue);
const changeEvent = (val: Array<number | string>) => {
  emits("change", val);
  emits("update:modelValue", val);
};
provide("CheckboxGroup", {
  name: "ICheckboxGroup",
  modelValue,
  changeEvent,
  min: props.min,
  max: props.max,
  disabled: props.disabled,
});
</script>

<template>
  <div>
    <div>{{ modelValue }}</div>
    <slot></slot>
  </div>
</template>
