<template>
  <div :class="ns.b()">
    <component
      :is="arrowControl ? NumArrowSelect : NumScrollSelect"
      v-model="hour"
      :nums="makeRange(0, 23)"
      :disabled="disabledHours"
    />
    <component
      :is="arrowControl ? NumArrowSelect : NumScrollSelect"
      v-model="min"
      :nums="makeRange(0, 59)"
      :disabled="disabledMinutes"
    />
    <component
      :is="arrowControl ? NumArrowSelect : NumScrollSelect"
      v-model="sec"
      :nums="makeRange(0, 59)"
      :disabled="disabledSeconds"
    />
  </div>
</template>

<script lang="ts" setup>
import NumScrollSelect from './num-scroll-select.vue'
import NumArrowSelect from './num-arrow-select.vue'
import { computed } from 'vue'
import { useNamespace } from '@/hooks'

const ns = useNamespace('time-spinner')

const props = defineProps({
  modelValue: Date,
  arrowControl: { type: Boolean, default: false },
  disabledHours: Array<number>,
  disabledMinutes: Array<number>,
  disabledSeconds: Array<number>,
})

const emits = defineEmits(['update:modelValue'])

const date = computed({
  get: () => props.modelValue,
  set: val => {
    emits('update:modelValue', val)
  },
})

const hour = computed({
  get: () => date.value?.getHours(),
  set: val => {
    if (date.value) {
      let temp = new Date(date.value)
      temp.setHours(val!)
      date.value = temp
    } else {
      date.value = new Date()
    }
  },
})
const min = computed({
  get: () => date.value?.getMinutes(),
  set: val => {
    if (date.value) {
      let temp = new Date(date.value)
      temp.setMinutes(val!)
      date.value = temp
    } else {
      date.value = new Date()
    }
  },
})
const sec = computed({
  get: () => date.value?.getSeconds(),
  set: val => {
    if (date.value) {
      let temp = new Date(date.value)
      temp.setSeconds(val!)
      date.value = temp
    } else {
      date.value = new Date()
    }
  },
})
const makeRange = (start: number, end: number) => {
  const result: number[] = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}
</script>

<style lang="less">
.byte-time-spinner {
  display: flex;
  position: relative;
  text-align: center;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    margin-top: -16px;
    margin-left: 12%;
    margin-right: 12%;
    height: 32px;
    left: 0;
    right: 0;
    border-top: 1px solid #e4e7ed;
    border-bottom: 1px solid #e4e7ed;
  }
}
</style>
