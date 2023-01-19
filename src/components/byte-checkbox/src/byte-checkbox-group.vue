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
//使用provide/inject进行组件通讯，将props传入checkbox处理
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
  <!-- 此组件对checkbox进行包裹，通过slot传入子项
    所有子项的value与自身属性绑定，共用一个数组对值存储 
  -->
  <div>
    <slot></slot>
  </div>
</template>
