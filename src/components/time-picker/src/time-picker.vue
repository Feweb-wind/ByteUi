<template>
  <byte-popover trigger="focus" style="bottom: 6px" :teleported="teleported">
    <template #reference>
      <byte-input
        ref="timePickerInput"
        v-model="dateInputValue"
        :name="name"
        :prefix-icon="Clock"
        :disabled="disabled"
        :placeholder="placeholder"
        :clearable="clearable"
        :suffix-icon="clearIcon"
        @focus="handleFocus"
        @change="change"
      />
    </template>
    <time-panel
      v-model="date"
      ref="timePanelRef"
      :is-range="isRange"
      :arrow-control="arrowControl"
      :default-value="defaultValue"
      :format="format"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
      v-bind="$attrs"
      @canel="date = temp"
    />
  </byte-popover>
</template>

<script lang="ts" setup>
import { ByteInput, BytePopover } from '@byte-ui/components'
import TimePanel from './time-panel.vue'
import { Clock } from '@element-plus/icons-vue'
import { computed, ref, watch } from 'vue'
import { timePickerProps } from './time-picker'
import type { ModelValueType } from './time-picker'
import dayjs from 'dayjs'

const props = defineProps(timePickerProps)
const emits = defineEmits(['update:modelValue'])
const timePickerInput = ref<typeof ByteInput>()

const mode = ref<
  'date' | 'string' | 'number' | 'range&date' | 'range&string' | 'range&number'
>()

const date = computed({
  get: () => {
    if (!props.modelValue) {
      mode.value = props.isRange ? 'range&date' : 'date'
      return props.isRange ? [new Date(), new Date()] : undefined
    } else if (props.modelValue instanceof Date) {
      mode.value = 'date'
      return props.modelValue
    } else if (typeof props.modelValue === 'string') {
      mode.value = 'string'
      return dayjs(props.modelValue, props.format).toDate()
    } else if (typeof props.modelValue === 'number') {
      mode.value = 'number'
      return dayjs(props.modelValue).toDate()
    } else if (props.modelValue instanceof Array) {
      if (
        props.modelValue[0] instanceof Date &&
        props.modelValue[1] instanceof Date
      ) {
        mode.value = 'range&date'
        return [props.modelValue[0], props.modelValue[1]]
      } else if (
        typeof props.modelValue[0] === 'string' &&
        typeof props.modelValue[1] === 'string'
      ) {
        mode.value = 'range&string'
        return [
          dayjs(props.modelValue[0], props.format).toDate(),
          dayjs(props.modelValue[1], props.format).toDate(),
        ]
      } else if (typeof props.modelValue[0] === 'number') {
        mode.value = 'range&number'
        return [
          dayjs(props.modelValue[0]).toDate(),
          dayjs(props.modelValue[1]).toDate(),
        ]
      }
    }
  },
  set: val => {
    let newVal: ModelValueType | undefined
    switch (mode.value) {
      case 'date':
        newVal = val instanceof Date ? dayjs(val).toDate() : undefined
        break
      case 'string':
        newVal =
          val instanceof Date ? dayjs(val).format(props.format) : undefined
        break
      case 'number':
        newVal = val instanceof Date ? dayjs(val).valueOf() : undefined
        break
      case 'range&date':
        newVal =
          val instanceof Array
            ? [dayjs(val[0]).toDate(), dayjs(val[1]).toDate()]
            : undefined
        break
      case 'range&string':
        newVal =
          val instanceof Array
            ? [
                dayjs(val[0]).format(props.format),
                dayjs(val[1]).format(props.format),
              ]
            : undefined
        break
      case 'range&number':
        newVal =
          val instanceof Array
            ? [dayjs(val[0]).valueOf(), dayjs(val[1]).valueOf()]
            : undefined
        break
      default:
        break
    }
    emits('update:modelValue', newVal)
  },
})

const dateInputValue = ref(
  date.value instanceof Date ? dayjs(date.value).format(props.format) : ''
)

watch(date, (val, oldVal) => {
  dateInputValue.value = val instanceof Date ? dayjs(val).format(props.format) : ''
})

const temp = ref<Date | Date[]>()

const change = (): void => {
  const inputParse = dayjs(dateInputValue.value, props.format, true)
  if (inputParse.isValid()) {
    let newVal
    switch (mode.value) {
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
    dateInputValue.value =
      date.value instanceof Date ? dayjs(date.value).format(props.format) : ''
  }
}

const handleFocus = (): void => {
  if (!props.modelValue) {
    date.value = new Date()
  }
  temp.value = date.value
}

const focus = (): void => {
  timePickerInput.value?.focus()
}
const blur = (): void => {
  timePickerInput.value?.blur()
}
defineExpose({
  blur,
  focus,
})
</script>

<style lang="less">
.byte-tooltip {
  padding: 0 !important;
  bottom: 6px;
  user-select: none;
}
</style>
