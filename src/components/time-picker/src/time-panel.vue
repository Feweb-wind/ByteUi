<template>
  <div :class="[ns.e('content'), ns.is('range', isRange)]">
    <div :class="ns.e('range')" v-if="props.isRange">
      <div :class="ns.e('range__cell')">
        <div :class="ns.e('range__header')">{{ startPlaceholder }}</div>
        <time-spinner v-model="startTime" :arrow-control="arrowControl" />
      </div>
      <div :class="ns.e('range__cell')">
        <div :class="ns.e('range__header')">{{ endPlaceholder }}</div>
        <time-spinner v-model="endTime" :arrow-control="arrowControl" />
      </div>
    </div>
    <time-spinner v-model="date" :arrow-control="arrowControl" v-else />
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
  modelValue: [Object, Array] as PropType<Date | Date[]>,
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
