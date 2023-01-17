<template>
  <div :class="sliderClass">
    <input
      type="range"
      :min="min"
      :max="max"
      :value="modelValue"
      :step="step"
      :disabled="disabled"
      @change="updateValue"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  step: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

// 双向绑定
const emit = defineEmits(['update:modelValue']);
const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

// 设置动态样式
const sliderClass = computed(() => {
  return [
    "byte-slider",
    {
      "byte-slider-disable": props.disabled
    }
  ]
});

</script>
<style lang="less" scoped>
.byte-slider {
  // background-color: #ccc;

  input {
    width: 100%;
    cursor: pointer;
    // cursor: grab;
  }
}

.byte-slider-disable {
  input {
    width: 100%;
    cursor: no-drop;
    // cursor: grab;
  }
}
</style>
