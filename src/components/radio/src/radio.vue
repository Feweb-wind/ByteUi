<script setup lang="ts">
import { radioProps, radioEmits } from "./radio";
import { useRadio } from "./use-radio";
const props = defineProps(radioProps);
const emit = defineEmits(radioEmits);

const { modelValue, disabled } = useRadio(props, emit);
</script>

<template>
  <label>
    <span>
      <input
        v-model="modelValue"
        type="radio"
        :value="label"
        :name="name"
        :disabled="disabled"
      />
    </span>
    <span>
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<style></style>
