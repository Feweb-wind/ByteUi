<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { nextTick, provide, reactive, toRefs } from "vue";
import {
  radioGroupEmits,
  RadioGroupProps,
  radioGroupProps,
} from "./radio-group";
import { radioGroupKey } from "@byte-ui/tokens";
import { UPDATE_MODEL_EVENT } from "@/constants";

const props = defineProps(radioGroupProps);
const emit = defineEmits(radioGroupEmits);

const changeEvent = (value: RadioGroupProps["modelValue"]) => {
  emit(UPDATE_MODEL_EVENT, value);
  nextTick(() => emit("change", value));
};
provide(
  radioGroupKey,
  reactive({
    ...toRefs(props),
    changeEvent,
  })
);
</script>
