<template>
  <input
    v-if="isRange"
    type="text"
    v-model="inputValue"
    :class="editorNs.b('input')"
    :name="name"
    :placeholder="placeholder"
    @blur="event => emits('blur', event)"
    @focus="event => emits('focus', event)"
    @input="event => emits('input', event)"
    @change="event => change(event)"
  />
  <byte-input
    v-else
    ref="timePickerInput"
    v-model="inputValue"
    :name="name"
    :prefix-icon="prefixIcon"
    :disabled="disabled"
    :placeholder="placeholder"
    :clearable="clearable"
    :suffix-icon="clearIcon"
    @blur="event => emits('blur', event)"
    @focus="event => emits('focus', event)"
    @input="event => emits('input', event)"
    @change="event => change(event)"
  />
</template>

<script lang="ts" setup>
import { useNamespace } from '@/hooks'
import { ByteInput } from '@/byte-ui'
import dayjs from 'dayjs'
import { ref, watch } from 'vue'
import { timePickerProps } from './time-picker'

const editorNs = useNamespace('date-editor')
const props = defineProps({
  ...timePickerProps,
  modelValue: Date,
  mode: String,
})
const emits = defineEmits([
  'update:modelValue',
  'blur',
  'focus',
  'change',
  'input',
  'change',
  'clear',
])

const inputValue = ref(dayjs(props.modelValue).format(props.format))

watch(
  () => props.modelValue,
  (val, oldVal) => {
    inputValue.value = dayjs(val).format(props.format)
  }
)

const change = (event: Event): void => {
  emits('change', event)
  const inputParse = dayjs(inputValue.value, props.format, true)
  if (inputParse.isValid()) {
    let newVal
    switch (props.mode) {
      case 'date':
        newVal = inputParse.toDate()
        break
      case 'string':
        newVal = inputParse.format(props.format)
        break
      case 'number':
        newVal = inputParse.valueOf()
        break
      default:
        break
    }
    emits('update:modelValue', newVal)
  } else {
    inputValue.value = dayjs(props.modelValue).format(props.format)
  }
}
</script>

<style lang="less">
.byte-date-editor-input {
  border: none;
  outline: none;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  margin: 0;
  padding: 0;
  width: 39%;
  text-align: center;
}
</style>
