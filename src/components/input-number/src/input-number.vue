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
    <!-- 减号 -->
    <span
      class="byte-input-number__decrease"
      :class="{
        'is-disabled': props.min && value <= props.min!,
      }"
      @click="decrease"
    >
      <byte-icon>
        <ArrowDown v-if="props.controlsPosition === 'right'" />
        <Minus v-else />
      </byte-icon>
    </span>
    <!-- 加号 -->
    <span
      class="byte-input-number__increase"
      :class="{
      'is-disabled': props.max && value >= props.max!,
    }"
      @click="increase"
    >
      <byte-icon>
        <ArrowUp v-if="props.controlsPosition === 'right'" />
        <Plus v-else />
      </byte-icon>
    </span>
    <!-- 输入框 -->
    <ByteInput
      v-model="inuptValue"
      ref="input"
      type="number"
      :placeholder="props.placeholder"
      :name="props.name"
      :disabled="props.disabled"
      :size="props.size"
      :readonly="props.readonly"
      :max="props.max"
      :min="props.min"
      :label="props.label"
      :showPassword="false"
      @change="valueChange(inuptValue)"
      @blur="(event: FocusEvent) => emits('blur', event)"
      @focus="(event: FocusEvent) => emits('focus', event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import ByteInput from '../../byte-input.vue'
import {ByteIcon} from '@byte-ui/components'
import { Minus, Plus, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { inputNumberProps, inputNumberEmits } from './input-number'

import type Input from '../../byte-input.vue'
type InputInstance = InstanceType<typeof Input>

// 属性定义以及默认值
const props = defineProps(inputNumberProps)

// 定义事件
const emits = defineEmits(inputNumberEmits)

// 保存值
let value = ref<number>(props.modelValue!)
// 输入值
let inuptValue = ref<number | string>(value.value)
// 获取实例
const input = ref<InputInstance>()

// 减
function decrease() {
  // 如果为关闭状态或只读则跳过
  if (!props.disabled && !props.readonly) valueChange(value.value - props.step)
}

// 加
function increase() {
  // 如果为关闭状态或只读则跳过
  if (!props.disabled && !props.readonly) valueChange(value.value + props.step)
}

// 检测数值变化
function valueChange(newValue: number | string) {
  // 保存旧值
  let oldValue = value.value
  // 空值处理
  if (newValue === '') {
    // 清空时显示的值
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
      // 未设置直接返回undefined
      emits('update:modelValue', undefined)
      return
    }
  }

  // 如果输入值有其他字符则将NaN顶上去
  value.value = typeof newValue === 'string' ? parseFloat(newValue) : newValue
  // 如果超出范围处理
  if (props.max && value.value > props.max) {
    value.value = props.max
  } else if (props.min!==Number.NEGATIVE_INFINITY && value.value < props.min) {
    value.value = props.min
  } else if (props.stepStrictly && value.value % props.step !== 0) {
    // 如果设置了 step 的倍数
    valueChange(value.value - (value.value % props.step))
  }
  inuptValue.value = value.value

  if (value.value !== oldValue) {
    emits('change', value.value, oldValue)
    emits('update:modelValue', value.value)
  }
}

// 调用获取和失去焦点的方法
const focus = () => {
  input.value?.focus?.()
}
const blur = () => {
  input.value?.blur?.()
}

// 父组件修改modelValue，inuptValue和value不及时更新
watch(
  () => props.modelValue,
  (newvalue) => {
    if(typeof newvalue === "number"){
      inuptValue.value = newvalue;
      value.value = newvalue;
    }
  }
)

// 子组件输入事件inuptValue实时更新，并传递到父组件
watch(
  inuptValue,
  (newValue) => {
    valueChange(newValue);
  }
)

// 对外暴露方法
defineExpose({
  // 使 ByteInput 组件获得焦点
  focus,
  // 使 ByteInput 组件失去焦点
  blur
})
</script>

<style lang="less">
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
