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
      <i class="byte-icon">
        <ArrowDown v-if="props.controlsPosition === 'right'" />
        <Minus v-else />
      </i>
    </span>
    <!-- 加号 -->
    <span
      class="byte-input-number__increase"
      :class="{
      'is-disabled': props.max && value >= props.max!,
    }"
      @click="increase"
    >
      <i class="byte-icon">
        <ArrowUp v-if="props.controlsPosition === 'right'" />
        <Plus v-else />
      </i>
    </span>
    <!-- 输入框 -->
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
import { Minus, Plus, ArrowDown, ArrowUp } from '@element-plus/icons-vue'

// 属性列表
export interface ByteInputNumber {
  // 选中项绑定值
  modelValue: number | undefined
  // 设置计数器允许的最小值
  max?: number
  // 设置计数器允许的最大值
  min?: number
  // 计数器步长
  setup?: number
  // 是否只能输入 step 的倍数
  stepStrictly?: boolean
  // 数值精度
  precision?: number
  // 计数器尺寸
  size?: 'large' | 'default' | 'small'
  // 原生  readonly 属性，是否只读
  readonly?: boolean
  // 是否禁用状态
  disabled?: boolean
  // 是否使用控制按钮
  controls?: boolean
  // 控制按钮位置
  controlsPosition?: 'right'
  // 	等价于原生 input name 属性	
  name?: string
  // 输入框关联的 label 文字
  label?: string
  // 输入框默认 placeholder
  placeholder?: string
  // 当输入框被清空时显示的值
  valueOnClear?: 'max' | 'min' | number | null
  // 输入时是否触发表单的校验
  validateEvent?: boolean
}

// 属性定义以及默认值
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

// 定义事件
const emits = defineEmits<{
  // 双向绑定
  (e: 'update:modelValue', newValue: number | undefined): number
  (
    e: 'change',
    currentValue: number | undefined,
    oldValue: number | undefined
  ): void
  // 失去焦点
  (e: 'blur', event: Event): void
  // 获得焦点
  (e: 'focus', event: Event): void
}>()

// 保存值
let value = ref<number>(props.modelValue)
// 输入值
let inuptValue = ref<number | string>(value.value)

// 减
function decrease() {
  // 如果为关闭状态或只读则跳过
  if (!props.disabled && !props.readonly) valueChange(value.value - props.setup)
}

// 加
function increase() {
  // 如果为关闭状态或只读则跳过
  if (!props.disabled && !props.readonly) valueChange(value.value + props.setup)
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
  } else if (props.min && value.value < props.min) {
    value.value = props.min
  } else if (props.stepStrictly && value.value % props.setup !== 0) {
    // 如果设置了 step 的倍数
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
