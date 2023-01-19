<script setup lang="ts">
import { cloneNode } from "@babel/types";
import { ref, computed, inject, ComputedRef, withDefaults } from "vue";
import { useCheckbox } from "./useCheckbox";
interface checkboxProps {
  modelValue?: number | string | boolean;
  label?: string | boolean | number | object;
  disabled?: boolean;
  border?: boolean;
  trueLabel?: number | string;
  falseLabel?: number | string;
  id?: string;
  name?: string;
  size?: "large" | "small" | "default";
  checked?: boolean;
  indeterminate?: boolean;
  isButton?: boolean;
}

const props = withDefaults(defineProps<checkboxProps>(), {
  disabled: false,
  border: false,
  trueLabel: undefined,
  falseLabel: undefined,
  size: "default",
  id: undefined,
  name: undefined,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | boolean): void;
  (e: "change", val: boolean | string | number): void;
}>();

const { handleChange, model, isChecked, isDisabled } = useCheckbox(props, emit);

const isFloat = ref(props.isButton ? "none" : "left");
const color = ref("red");
</script>

<template>
  <div class="common" :class="{ floatButton: isButton }">
    <label
      :class="[
        {
          disabledClass: isDisabled,
          isChecked,
          customBorder: border,
          borderActive: isChecked && border,
          checkboxButton: isButton,
          checkboxButtonActive: isButton && isChecked,
        },
        size,
      ]"
    >
      <input
        v-if="trueLabel || falseLabel"
        :class="{ resetInput: isButton }"
        v-model="model"
        type="checkbox"
        :id="id"
        :name="name"
        :value="label"
        :true-value="trueLabel"
        :false-value="falseLabel"
        :disabled="isDisabled"
        :indeterminate="indeterminate"
        @change="handleChange"
      />
      <input
        v-else
        :class="{ resetInput: isButton }"
        type="checkbox"
        v-model="model"
        :id="id"
        :name="name"
        :value="label"
        :disabled="isDisabled"
        :indeterminate="indeterminate"
        @change="handleChange"
      />
      <span>
        <slot />
        <template v-if="!$slots.default">{{ label }}</template>
      </span>
    </label>
  </div>
</template>

<style lang="less">
.common {
  padding: 10px;
  color: #606266;
  display: inline-block;
}
.large {
  zoom: 120%;
}
.small {
  zoom: 80%;
}
input[type="checkbox"] {
  cursor: pointer;
  position: relative;
}
input[type="checkbox"]:checked {
  background-color: #409eff;
  border-color: #409eff;
}
.customBorder {
  border: 1px solid #dcdfe6;
}
.borderActive {
  border: 2px solid #409eff;
}
.disabledClass {
  cursor: not-allowed;
}
.isChecked {
  color: #409eff;
}

.floatButton {
  padding: 10px 0 10px 0;
  .resetInput {
    display: none;
  }
  .checkboxButton {
    cursor: pointer;
    border: 1px solid darkgray;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
  }
  .checkboxButtonActive {
    color: #fff;
    border: 1px solid #409eff;
    background-color: #409eff; /* Green */
  }
}
</style>
