<template>
  <byte-scrollbar v-bind="scrollbarProps" @scroll="scroll" ref="scrollbarRef">
    <ul :class="ns.e('list')">
      <li
        v-for="(item, index) of nums"
        :key="index"
        :class="[
          ns.e('item'),
          ns.is('disabled', disabled?.includes(item)),
          ns.is('active', currentValue === item),
        ]"
        @click="
          !disabled?.includes(item) && scrollbarRef!.setScrollTop(index * 32)
        "
      >
        {{ index < 10 ? '0' + index : index }}
      </li>
    </ul>
  </byte-scrollbar>
</template>

<script lang="ts" setup>
import { ByteScrollbar } from '@/components'
import { useNamespace } from '@/hooks'
import { debounce } from 'lodash'
import { computed, onMounted, ref } from 'vue'

const ns = useNamespace('time-spinner')
const scrollbarProps = {
  height: '192px',
  class: ns.e('wrapper'),
}

const scrollbarRef = ref<InstanceType<typeof ByteScrollbar>>()

const props = defineProps({
  modelValue: Number,
  nums: Array<number>,
  disabled: { type: Array<number>, default: [] },
})

const emits = defineEmits(['update:modelValue'])

const currentValue = computed({
  get: () => props.modelValue,
  set: val => {
    val = val ? val : 0
    scrollbarRef.value?.setScrollTop(val * 32)
    emits('update:modelValue', val)
  },
})

onMounted(() => {
  currentValue.value = currentValue.value ? currentValue.value : 0
})

const able = computed(() => {
  let result: number[] = []
  props.nums?.forEach(item => {
    if (!props.disabled.includes(item)) result.push(item)
  })
  return result
})

const scroll = debounce(({ scrollTop }: { scrollTop: number }) => {
  let targetValue: number
  if (scrollTop % 32 !== 0) {
    let target =
      scrollTop % 32 < 16
        ? scrollTop - (scrollTop % 32)
        : scrollTop + 32 - (scrollTop % 32)
    targetValue = target / 32
  } else {
    targetValue = scrollTop / 32
  }
  currentValue.value = props.disabled.includes(targetValue)
    ? findClosest(able.value, targetValue)
    : targetValue
}, 100)

const findClosest = (arr: number[], num: number) => {
  const creds = arr.reduce(
    (acc, val, ind) => {
      let { diff, index } = acc
      const difference = Math.abs(val - num)
      if (difference < diff) {
        diff = difference
        index = ind
      }
      return { diff, index }
    },
    {
      diff: Infinity,
      index: -1,
    }
  )
  return arr[creds.index]
}
</script>

<style lang="less">
.byte-time-spinner__wrapper {
  width: 60px;
}
.byte-time-spinner__list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.byte-time-spinner__list::before,
.byte-time-spinner__list::after {
  content: '';
  display: block;
  width: 100%;
  height: 80px;
}
.byte-time-spinner__item {
  user-select: none;
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  color: #606266;
  cursor: pointer;

  &.is-active:not(.is-disabled) {
    color: #303133;
    font-weight: 700;
  }
  &.is-disabled {
    color: #a8abb2;
    cursor: not-allowed !important;
  }
  &:hover {
    background: #f5f7fa;
  }
}
</style>
