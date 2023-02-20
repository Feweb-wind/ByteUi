<template>
  <div :class="[ns.e('content'), ns.is('range', isRange)]">
    <div :class="ns.e('range')" v-if="props.isRange">
      <div :class="ns.e('range__cell')">
        <div :class="ns.e('range__header')">{{ startPlaceholder }}</div>
        <time-spinner
          v-model="startTime"
          :arrow-control="arrowControl"
          :disabled-hours="startTimeDisabledHours"
          :disabled-minutes="startTimeDisabledMinutes"
          :disabled-seconds="startTimeDisabledSeconds"
        />
      </div>
      <div :class="ns.e('range__cell')">
        <div :class="ns.e('range__header')">{{ endPlaceholder }}</div>
        <time-spinner
          v-model="endTime"
          :arrow-control="arrowControl"
          :disabled-hours="endTimeDisabledHours"
          :disabled-minutes="endTimeDisabledMinutes"
          :disabled-seconds="endTimeDisabledSeconds"
        />
      </div>
    </div>
    <time-spinner
      v-model="date"
      :arrow-control="arrowControl"
      :disabled-hours="defaultDisabledHours"
      :disabled-minutes="defaultDisabledMinutes"
      :disabled-seconds="defaultDisabledSeconds"
      v-else
    />
  </div>
  <div :class="ns.e('footer')">
    <button :class="[ns.e('btn'), 'cancel']" @click="emits('canel')">
      Canel
    </button>
    <button :class="[ns.e('btn'), 'confirm']" @click="emits('confirm')">
      OK
    </button>
  </div>
</template>

<script lang="ts" setup>
import TimeSpinner from './time-spinner.vue'
import { useNamespace } from '@/hooks'
import { timePickerProps } from './time-picker'
import { computed, PropType } from 'vue'

const ns = useNamespace('time-panel')
const props = defineProps({
  ...timePickerProps,
  modelValue: [Object, Array] as PropType<Date | [Date, Date]>,
})
const emits = defineEmits(['update:modelValue', 'confirm', 'canel'])

const date = computed({
  get: () => (props.modelValue instanceof Date ? props.modelValue : undefined),
  set: val => emits('update:modelValue', val),
})

const startTime = computed({
  get: () =>
    props.modelValue instanceof Array ? props.modelValue[0] : undefined,
  set: val =>
    props.modelValue instanceof Array
      ? emits('update:modelValue', [val, props.modelValue[1]])
      : null,
})

const endTime = computed({
  get: () =>
    props.modelValue instanceof Array ? props.modelValue[1] : undefined,
  set: val =>
    props.modelValue instanceof Array
      ? emits('update:modelValue', [props.modelValue[0], val])
      : null,
})

// 默认不可选
const defaultDisabledHours = computed(() => props.disabledHours?.())
const defaultDisabledMinutes = computed(() =>
  props.disabledMinutes?.(
    props.modelValue instanceof Date
      ? props.modelValue.getHours()
      : new Date().getHours()
  )
)
const defaultDisabledSeconds = computed(() =>
  props.modelValue instanceof Date
    ? props.disabledSeconds?.(
        props.modelValue.getHours(),
        props.modelValue.getMinutes()
      )
    : props.disabledSeconds?.(new Date().getHours(), new Date().getMinutes())
)

const startTimeDisabledHours = computed(() => {
  if (props.modelValue instanceof Array) {
    let lessHours: number[] = []
    for (let index = endTime.value!.getHours() + 1; index < 24; index++) {
      if (!defaultDisabledHours.value?.includes(index)) {
        lessHours.push(index)
      }
    }
    return lessHours.concat(
      defaultDisabledHours.value ? defaultDisabledHours.value : []
    )
  }
})
const startTimeDisabledMinutes = computed(() => {
  if (props.modelValue instanceof Array) {
    let lessMinutes: number[] = []
    for (let index = endTime.value!.getMinutes() + 1; index < 60; index++) {
      if (!defaultDisabledMinutes.value?.includes(index)) {
        lessMinutes.push(index)
      }
    }
    return lessMinutes.concat(
      defaultDisabledMinutes.value ? defaultDisabledMinutes.value : []
    )
  }
})
const startTimeDisabledSeconds = computed(() => {
  if (props.modelValue instanceof Array) {
    let lessSeconds: number[] = []
    for (let index = endTime.value!.getSeconds() + 1; index < 60; index++) {
      if (!defaultDisabledSeconds.value?.includes(index)) {
        lessSeconds.push(index)
      }
    }
    return lessSeconds.concat(
      defaultDisabledSeconds.value ? defaultDisabledSeconds.value : []
    )
  }
})

const endTimeDisabledHours = computed(() => {
  if (props.modelValue instanceof Array) {
    let moreHours: number[] = []
    for (let index = startTime.value!.getHours() - 1; index >= 0; index--) {
      if (!defaultDisabledHours.value?.includes(index)) {
        moreHours.push(index)
      }
    }
    return moreHours.concat(
      defaultDisabledHours.value ? defaultDisabledHours.value : []
    )
  }
})
const endTimeDisabledMinutes = computed(() => {
  if (props.modelValue instanceof Array) {
    let moreMinutes: number[] = []
    for (let index = startTime.value!.getMinutes() - 1; index >= 0; index--) {
      if (!defaultDisabledMinutes.value?.includes(index)) {
        moreMinutes.push(index)
      }
    }
    return moreMinutes.concat(
      defaultDisabledMinutes.value ? defaultDisabledMinutes.value : []
    )
  }
})
const endTimeDisabledSeconds = computed(() => {
  if (props.modelValue instanceof Array) {
    let moreSeconds: number[] = []
    for (let index = startTime.value!.getSeconds() - 1; index >= 0; index--) {
      if (!defaultDisabledSeconds.value?.includes(index)) {
        moreSeconds.push(index)
      }
    }
    return moreSeconds.concat(
      defaultDisabledSeconds.value ? defaultDisabledSeconds.value : []
    )
  }
})
</script>

<style lang="less">
.byte-time-panel__content {
  &.is-range {
    padding: 10px;
  }
  .byte-time-panel__range {
    display: flex;
    .byte-time-spinner__wrapper {
      width: 50px;
    }
    .byte-time-panel__range__cell {
      padding: 4px 7px 7px;
      .byte-time-panel__range__header {
        margin-bottom: 5px;
        text-align: center;
        font-size: 14px;
        color: #606266;
        line-height: 30px;
      }
      .byte-time-spinner {
        border: 1px solid #e4e7ed;
      }
    }
  }
}
.byte-time-panel__footer {
  border-top: 1px solid #e4e7ed;
  text-align: right;
  padding: 4px;
  height: 36px;
  line-height: 25px;
  box-sizing: border-box;

  .byte-time-panel__btn {
    &.confirm {
      font-weight: 800;
      color: #409eff;
    }
    border: none;
    line-height: 28px;
    padding: 0 5px;
    margin: 0 5px;
    cursor: pointer;
    background-color: transparent;
    outline: none;
    font-size: 12px;
    color: var(--el-text-color-primary);
  }
}
</style>
