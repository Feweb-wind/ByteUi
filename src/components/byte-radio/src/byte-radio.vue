<script setup lang="ts">
import { cloneNode } from "@babel/types";
import { withDefaults } from "vue";
import { useRadio } from "./useRadio";
interface radioProps {
  modelValue?: number | string | boolean;
  label?: string | boolean | number | object;
  disabled?: boolean;
  border?: boolean;
  trueLabel?: number | string; // true value
  falseLabel?: number | string; // false value
  id?: string;
  name?: string;
  size?: "large" | "small" | "default";
  checked?: boolean;
  indeterminate?: boolean; // radio的中间项
  isButton?: boolean;
}

const props = withDefaults(defineProps<radioProps>(), {
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

const { handleChange, model, isChecked, isDisabled } = useRadio(props, emit);
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
          radioButton: isButton,
          radioButtonActive: isButton && isChecked,
        },
        size,
      ]"
    >
      <input
          v-if="trueLabel || falseLabel"
          :class="{ resetInput: isButton }"
          v-model="model"
          type="radio"
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
          type="radio"
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
        <template v-if="!$slots.default"> {{ label }} </template>
      </span>
    </label>
  </div>
</template>

<style scoped lang="less">
//控制radio大小
.common {
  padding: 10px;
  color: #606266;
  border: 1px solid #dcdfe6;
  border-radius: 100%;
  width: 14px;
  height: 14px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
}
.large {
  zoom: 120%;
}
.small {
  zoom: 80%;
}
input[type="radio"] {
  border: 1px solid #dcdfe6;
  border-radius: 100%;
  width: 14px;
  height: 14px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
}
input[type="radio"]:checked {
  background-color: #409eff;
  border-color: #409eff;
}
// transform效果
input[type="radio"]:checked::after {
  transform: translate(-50%, -50%) scale(1);
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
  .radioButton {
    cursor: pointer;
    border: 1px solid darkgray;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
  }
  .radioButtonActive {
    color: #fff;
    border: 1px solid #409eff;
    background-color: #409eff;
  }
}
</style>
