<script setup lang="ts">
import { computed, provide } from "vue";
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});
const emits = defineEmits(["update:modelValue"]);
const modelValue = computed(() => props.modelValue);
const changeEvent = (val) => {
  // emits("change", val);
  emits("update:modelValue", val);
};
provide("CheckboxGroup", { name: "CheckboxGroup", modelValue, changeEvent });
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
