<template>
  <label
    class="radio-button"
    :class="[{ activeClass: modelValue === label, disabledClass: disabled }]"
  >
    <input
      ref="radioRef"
      v-model="modelValue"
      type="radio"
      :value="label"
      :name="name || radioGroup?.name"
      :disabled="disabled"
      @focus="focus = true"
      @blur="focus = false"
      class="disabled-input"
    />
    <span
      :style="modelValue === label ? activeStyle : {}"
      class="radio-content"
      :class="sizeButton"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from "vue";
import { radioButtonProps } from "./radio-button";
import { useRadio } from "./use-radio";

const props = defineProps(radioButtonProps);
const { modelValue, radioGroup, focus, radioRef, size } = useRadio(props);

const activeStyle = computed<CSSProperties>(() => {
  return {
    backgroundColor: radioGroup?.fill || "",
    borderColor: radioGroup?.fill || "",
    boxShadow: radioGroup?.fill ? `-1px 0 0 0 ${radioGroup.fill}` : "",
    color: radioGroup?.textColor || "",
  };
});
const sizeButton = computed(() => `${size.value}-button`);
</script>

<style lang="less" scoped>
.radio-button {
  display: inline-block;
  cursor: pointer;
  .disabled-input {
    display: none;
  }
  .radio-content {
    display: inline-block;
    border: 1px solid #dcdfe6;
    vertical-align: middle;
  }
}
.activeClass {
  color: #fff;
  background-color: #409eff;
}
.default-button {
  font-size: 14px;
}
.large-button {
  padding: 12px 19px;
  font-size: 14px;
}
.small-button {
  padding: 5px 11px;
  font-size: 12px;
}
.disabledClass {
  cursor: not-allowed;
  color: #dcdfe6;
}
</style>
