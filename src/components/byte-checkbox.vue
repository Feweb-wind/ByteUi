<script setup lang="ts">
import { ref, computed, inject, ComputedRef } from "vue";
const props = defineProps({
  label: {
    type: [String, Boolean, Number, Object],
    default: undefined,
  },
  modelValue: {
    type: [Number, String, Boolean],
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  border: Boolean,
  trueLabel: {
    type: [Number, String],
    default: undefined,
  },
  falseLabel: {
    type: [Number, String],
    default: undefined,
  },
  id: {
    type: String,
    default: "label",
  },
  name: {
    type: String,
    default: undefined,
  },
  size: {
    type: String,
    validator: (value) =>
      value === "large" || value == "default" || value == "small",
  },
});

const emits = defineEmits(["update:modelValue"]);

const handleChange = (event: Event) => {
  isChecked.value = event.target?.checked;
};
//checkboxGroup
const checkboxGroup = inject<{
  name: string;
  modelValue: ComputedRef;
  changeEvent: (val) => {};
}>("CheckboxGroup", {});
const isGroup = checkboxGroup.name == "CheckboxGroup";
const store = computed(() =>
  checkboxGroup ? checkboxGroup.modelValue?.value : props.modelValue
);
const model = computed({
  get() {
    return isGroup ? store.value : props.modelValue;
  },
  set(val) {
    if (isGroup) {
      return checkboxGroup.changeEvent(val);
    }
    emits("update:modelValue", val);
  },
});
let isChecked = ref(model.value);
</script>

<template>
  <label
    :class="[
      {
        disabledClass: disabled,
        isChecked,
        customBorder: border,
        borderActive: isChecked && border,
      },
      size,
    ]"
    class="common"
  >
    <input
      v-if="trueLabel || falseLabel"
      v-model="model"
      type="checkbox"
      :id="id"
      :name="name"
      :value="label"
      :true-value="trueLabel"
      :false-value="falseLabel"
      :disabled="disabled"
      @change="handleChange"
    />
    <input
      v-else
      v-model="model"
      type="checkbox"
      :id="id"
      :name="name"
      :value="label"
      :disabled="disabled"
      @change="handleChange"
    />
    <span>
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<style lang="less">
.common {
  padding: 10px;
}
.large {
  zoom: 120%;
}
.small {
  zoom: 80%;
}

.customBorder {
  border: 1px solid black;
}
.borderActive {
  border: 2px solid blue;
}
.disabledClass {
  cursor: not-allowed;
}
.isChecked {
  color: blue;
}
</style>
