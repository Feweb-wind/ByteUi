<template>
  <div
    class="byte-input-number"
    :class="{
      'is-disabled': props.disabled,
      'is-controls-right': props.controls && props.controlsPosition === 'right',
      'byte-input-number--large': props.size && props.size === 'large',
      'byte-input-number--small': props.size && props.size === 'small',
    }"
  >
    <span
      class="byte-input-number__decrease"
      :class="{
        'is-disabled': props.min && value <= props.min!,
      }"
      @click="decrease"
    >
      <i class="byte-icon"><Minus /></i>
    </span>
    <span
      class="byte-input-number__increase"
      :class="{
      'is-disabled': props.max && value >= props.max!,
    }"
      @click="increase"
    >
      <i class="byte-icon"><Plus /></i>
    </span>
    <ByteInput
      v-model="inuptValue"
      type="number"
      :placeholder="props.placeholder"
      :name="props.name"
      :disabled="props.disabled"
      :size="props.size"
      :readonly="props.readonly"
      :max="props.max"
      :min="props.min"
      :label="props.label"
      @change="valueChange(inuptValue)"
      @blur="event => emits('blur', event)"
      @focus="event => emits('focus', event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ByteInput from './byte-input.vue'
import { Minus, Plus } from '@element-plus/icons-vue'

export interface ByteInputNumber {
  modelValue: number | undefined
  max?: number
  min?: number
  setup?: number
  stepStrictly?: boolean
  precision?: number
  size?: 'large' | 'default' | 'small'
  readonly?: boolean
  disabled?: boolean
  controls?: boolean
  controlsPosition?: 'right'
  name?: string
  label?: string
  placeholder?: string
  valueOnClear?: 'max' | 'min' | number | null
  validateEvent?: boolean
}

const props = withDefaults(defineProps<ByteInputNumber>(), {
  modelValue: 1,
  setup: 1,
  'step-strictly': false,
  size: 'default',
  readonly: false,
  disabled: false,
  controls: true,
  validateEvent: true,
})

const emits = defineEmits<{
  (e: 'update:modelValue', newValue: number | undefined): number
  (
    e: 'change',
    currentValue: number | undefined,
    oldValue: number | undefined
  ): void
  (e: 'blur', event: Event): void
  (e: 'focus', event: Event): void
}>()

let value = ref<number>(props.modelValue)
let inuptValue = ref<number | string>(value.value)

function decrease() {
  if (!props.disabled && !props.readonly) valueChange(value.value - props.setup)
}

function increase() {
  if (!props.disabled && !props.readonly) valueChange(value.value + props.setup)
}

function valueChange(newValue: number | string) {
  let oldValue = value.value
  if (newValue === '') {
    if (props.valueOnClear) {
      if (
        typeof props.valueOnClear === 'string' &&
        ((props.valueOnClear === 'max' && props.max) ||
          (props.valueOnClear === 'min' && props.min))
      ) {
        newValue = props.valueOnClear === 'max' ? props.max! : props.min!
      }
      if (typeof props.valueOnClear === 'number') {
        newValue = props.valueOnClear
      }
    } else {
      emits('update:modelValue', undefined)
      return
    }
  }

  value.value = typeof newValue === 'string' ? parseFloat(newValue) : newValue
  if (props.max && value.value > props.max) {
    value.value = props.max
  } else if (props.min && value.value < props.min) {
    value.value = props.min
  } else if (props.stepStrictly && value.value % props.setup !== 0) {
    valueChange(value.value - (value.value % props.setup))
  }
  inuptValue.value = value.value
  emits('change', value.value, oldValue)
  emits('update:modelValue', value.value)
}
</script>

<style lang="less">
.byte-icon {
  height: 1em;
  width: 1em;
  line-height: 1em;
}
.byte-input-number {
  position: relative;
  display: inline-flex;
  width: 150px;
  line-height: 30px;
  box-sizing: border-box;

  .byte-input-number__decrease,
  .byte-input-number__increase {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    position: absolute;
    z-index: 1;
    top: 1px;
    bottom: 1px;
    width: 32px;
    background: #f5f7fa;
    color: #606266;
    cursor: pointer;
    font-size: 13px;
    user-select: none;
  }

  .byte-input-number__decrease:hover,
  .byte-input-number__increase:hover {
    color: #409eff;
  }

  .byte-input-number__decrease.is-disabled,
  .byte-input-number__increase.is-disabled {
    color: #a8abb2;
    cursor: not-allowed;
  }

  .byte-input-number__decrease {
    border-radius: 4px 0 0 4px;
    left: 1px;
    border-right: 1px solid #dcdfe6;
  }

  .byte-input-number__increase {
    border-radius: 0 4px 4px 0;
    right: 1px;
    border-left: 1px solid #dcdfe6;
  }
  .inner-input {
    input {
      text-align: center;
    }
  }
}
.byte-input-number.is-controls-right {
  .byte-input-number__decrease,
  .byte-input-number__increase {
    height: 19px;
  }
  .byte-input-number__decrease {
    left: auto;
    top: auto;
    right: 1px;
    border-right: none;
    border-left: 1px solid #dcdfe6;
    border-radius: 0 0 4px 0;
  }
  .byte-input-number__increase {
    border-radius: 0 4px 0 0;
    border-bottom: 1px solid #dcdfe6;
  }
}
.byte-input-number.byte-input-number--large.is-controls-right {
  .byte-input-number__decrease,
  .byte-input-number__increase {
    height: 23px;
  }
}
.byte-input-number.byte-input-number--small.is-controls-right {
  .byte-input-number__decrease,
  .byte-input-number__increase {
    height: 15px;
  }
}
.byte-input-number.is-disabled {
  cursor: not-allowed;
  .byte-input-number__decrease,
  .byte-input-number__increase {
    border-color: #e4e7ed;
    color: #e4e7ed;
    cursor: not-allowed;
  }
}
</style>
