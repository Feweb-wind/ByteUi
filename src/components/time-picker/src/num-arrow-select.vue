<template>
  <div :class="ns.e('wrapper')">
    <byte-icon :class="ns.e('arrow')" @click="reduce">
      <ArrowUp />
    </byte-icon>
    <div :class="ns.e('num-select')">
      <ul :class="ns.e('list')">
        <li
          :class="[
            ns.e('item'),
            ns.is('disabled', disabled.includes(modelValue - 1)),
          ]"
        >
          {{ modelValue > min ? modelValue - 1 : '' }}
        </li>
        <li :class="[ns.e('item'), ns.is('active')]">{{ modelValue }}</li>
        <li
          :class="[
            ns.e('item'),
            ns.is('disabled', disabled.includes(modelValue + 1)),
          ]"
        >
          {{ modelValue < max ? modelValue + 1 : '' }}
        </li>
      </ul>
    </div>
    <byte-icon :class="ns.e('arrow')" @click="add">
      <ArrowDown />
    </byte-icon>
  </div>
</template>

<script lang="ts" setup>
import { ByteIcon } from '@/byte-ui'
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import { useNamespace } from '@/hooks'
import { computed } from 'vue'

const ns = useNamespace('time-spinner')

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  nums: { type: Array<number>, default: [] },
  disabled: { type: Array<number>, default: [] },
})

const min = computed(() => props.nums[0])
const max = computed(() => props.nums[props.nums.length - 1])
const emits = defineEmits(['update:modelValue'])

const add = () => {
  let result = props.modelValue === max.value ? min.value : props.modelValue + 1
  if (props.disabled.includes(result)) {
    let index = props.nums.indexOf(result)
    for (; index < props.nums.length; index++) {
      if (!props.disabled.includes(props.nums[index])) {
        result = props.nums[index]
        break
      }
    }
    if (index === props.nums.length) result = props.modelValue
  }
  emits('update:modelValue', result)
}
const reduce = () => {
  let result = props.modelValue === min.value ? max.value : props.modelValue - 1
  if (props.disabled.includes(result)) {
    let index = props.nums.indexOf(result)
    for (; index >= 0; index--) {
      if (!props.disabled.includes(props.nums[index])) {
        result = props.nums[index]
        break
      }
    }
    if (index < 0) result = props.modelValue
  }

  emits('update:modelValue', result)
}
</script>

<style lang="less" scoped>
.byte-time-spinner__wrapper {
  height: 192px;
  // overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .byte-time-spinner__arrow {
    margin: 10px 0;
    height: 30px;
    width: 100%;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    cursor: pointer;

    &:hover {
      color: #409eff;
    }
  }

  .byte-time-spinner__num-select {
    width: 100%;
    overflow: hidden;

    .byte-time-spinner__list::before,
    .byte-time-spinner__list::after {
      height: 0px;
    }

    .byte-time-spinner__item {
      cursor: default;
    }
  }
}
</style>
