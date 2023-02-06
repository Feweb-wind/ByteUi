<template>
  <num-scroll-select v-model="hour" :nums="makeRange(0, 23)" />
  <num-scroll-select v-model="min" :nums="makeRange(0, 59)" />
  <!-- <num-scroll-select v-model="sec" :nums="makeRange(0, 59)" /> -->
  <component
    :is="arrowControl ? NumArrowSelect : NumScrollSelect"
    v-model="sec"
    :nums="makeRange(0, 59)"
    :disabled="[1, 2]"
  />
</template>

<script lang="ts" setup>
import NumScrollSelect from './num-scroll-select.vue'
import NumArrowSelect from './num-arrow-select.vue'
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Date, default: new Date() },
  arrowControl: { type: Boolean, default: true },
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
    let temp = new Date(date.value)
    temp.setHours(val)
    date.value = temp
  },
})
const min = computed({
  get: () => date.value?.getMinutes(),
  set: val => {
    let temp = new Date(date.value)
    temp.setMinutes(val)
    date.value = temp
  },
})
const sec = computed({
  get: () => date.value?.getSeconds(),
  set: val => {
    let temp = new Date(date.value)
    temp.setSeconds(val)
    date.value = temp
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
