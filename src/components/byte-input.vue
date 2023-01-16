<template>
  <div class="byte-input">
    <div class="byte-input__wrapper" :class="{ 'is-focus': isFocus }">
      <input
        class="byte-input__inner"
        :value="props.value"
        :type="props.type"
        :placeholder="props.placeholder"
        v-on:focusin="isFocus = true"
        v-on:focusout="isFocus = false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  value: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    required: false,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
})

let isFocus = ref(false)
</script>

<style lang="less">
.byte-input {
  width: 100%;

  input {
    outline: none;
    border: none;
  }

  .byte-input__wrapper {
    display: inline-flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1px 11px;
    box-sizing: border-box;
    box-shadow: 0 0 0 1px #dcdfe6 inset;
    transition: box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    border-radius: 4px;
  }

  .byte-input__wrapper.is-focus {
    box-shadow: 0 0 0 1px #409eff inset;
  }

  .byte-input__inner {
    width: 100%;
    height: 30px;
    font-size: 14px;
  }
}
</style>
