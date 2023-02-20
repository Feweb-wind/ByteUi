<template>
  <byte-scrollbar
    v-bind="scrollbarProps"
    @scroll="scroll"
    tag="ul"
    :view-class="ns.e('list')"
    ref="scrollbarRef"
  >
    <li
      v-for="(item, index) of nums"
      :key="index"
      :class="[
        ns.e('item'),
        ns.is('disabled', disabled?.includes(item)),
        ns.is('active', currentValue === item),
      ]"
      @click="!disabled?.includes(item) && (currentValue = index)"
    >
      {{ index < 10 ? '0' + index : index }}
    </li>
  </byte-scrollbar>
</template>

<script lang="ts" setup>
// import { ByteScrollbar } from '@/components'
import { useNamespace } from '@/hooks'
import { debounce } from 'lodash'
import { computed, onMounted, ref, watch } from 'vue'

const ns = useNamespace('time-spinner')
const scrollbarProps = {
  height: '192px',
  class: ns.e('wrapper'),
}

const scrollbarRef = ref<InstanceType<typeof ByteScrollbar>>()

// 定义属性
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  nums: Array<number>,
  disabled: { type: Array<number>, default: [] },
})

// 定义事件
const emits = defineEmits(['update:modelValue'])

// 提供modelValue修改
const currentValue = computed({
  get: () => props.modelValue,
  set: val => {
    emits('update:modelValue', val)
  },
})

// 监控modelValue及时更改转盘的显示
watch(currentValue, (val, oldVal) => {
  scrollbarRef.value?.setScrollTop(val * 32)
})

// 在创建时正确显示
onMounted(() => {
  scrollbarRef.value?.setScrollTop(props.modelValue * 32)
})

// 可选数字
const able = computed(() => {
  let result: number[] = []
  props.nums?.forEach(item => {
    if (!props.disabled.includes(item)) result.push(item)
  })
  return result
})

// 滚动时（防抖动）
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
  if (targetValue !== currentValue.value)
    currentValue.value = props.disabled.includes(targetValue)
      ? findClosest(able.value, targetValue)
      : targetValue
}, 100)

// 当选择了一个disabled的数字时，选择距离最近的可用数字
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