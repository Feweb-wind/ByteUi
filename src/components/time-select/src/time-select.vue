<template>
  <byte-select
    ref="select"
    :model-value="value"
    :disabled="props.disabled"
    :clearable="props.clearable"
    :clear-icon="props.clearIcon"
    :size="props.size"
    :effect="props.effect"
    :placeholder="props.placeholder"
    default-first-option
    :filterable="props.editable"
    @update:model-value="(event:Event)=>emits('update:modelValue',event)"
    @change="(event:Event) => emits('change', event)"
    @blur="(event:FocusEvent) => emits('blur', event)"
    @focus="(event:FocusEvent) => emits('focus', event)"
  >
    <byte-option
      v-for="item in items"
      :key="item.value"
      :label="item.value"
      :value="item.value"
      :disabled="item.disabled"
    />
    <template #prefix>
      <byte-icon v-if="props.prefixIcon">
        <component :is="props.prefixIcon" />
      </byte-icon>
    </template>
  </byte-select>
</template>

<script lang="ts" setup>
import { ByteSelect, ByteOption, ByteIcon } from '@byte-ui/components'
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { timeSelectProps } from './time-select'
import { compareTime, formatTime, nextTime, parseTime } from './util'
dayjs.extend(customParseFormat)

defineOptions({
  name: 'ByteTimeSelect',
})

const props = defineProps(timeSelectProps)
const emits = defineEmits(['focus', 'change', 'blur', 'update:modelValue'])

const select = ref<typeof ByteSelect>()
const value = computed(() => props.modelValue)
const start = computed(() => {
  const time = parseTime(props.start)
  return time ? formatTime(time) : null
})
const end = computed(() => {
  const time = parseTime(props.end)
  return time ? formatTime(time) : null
})
const step = computed(() => {
  const time = parseTime(props.step)
  return time ? formatTime(time) : null
})
const minTime = computed(() => {
  const time = parseTime(props.minTime || '')
  return time ? formatTime(time) : null
})
const maxTime = computed(() => {
  const time = parseTime(props.maxTime || '')
  return time ? formatTime(time) : null
})
const items = computed(() => {
  const result: { value: string; disabled: boolean }[] = []
  if (props.start && props.end && props.step) {
    let current = start.value
    let currentTime: string
    while (current && end.value && compareTime(current, end.value) <= 0) {
      console.log(dayjs(current, 'HH:mm'))

      currentTime = dayjs(current, 'HH:mm').format(props.format)
      result.push({
        value: currentTime,
        disabled:
          compareTime(current, minTime.value || '-1:-1') <= 0 ||
          compareTime(current, maxTime.value || '100:100') >= 0,
      })
      current = nextTime(current, step.value!)
    }
  }
  return result
})

const blur = () => {
  select.value?.blur?.()
}
const focus = () => {
  select.value?.focus?.()
}
defineExpose({
  blur,
  focus,
})
</script>
