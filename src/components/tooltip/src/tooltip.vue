<template>
  <div
    class="byte-tooltip-slot"
    ref="byteTooltipSlot"
    @click="dealClick"
    @mouseenter="dealMouseEnter"
    @mouseleave="dealMouseLeave"
    @focus="dealFocus"
    @blur="dealBlur"
  >
    <slot name="default" />
  </div>

  <Teleport :disabled="!teleported" to="body">
    <div
      class="byte-tooltip"
      :class="effectClass"
      ref="byteTooltipContainer"
      v-if="visible"
      aria-describedby="tooltip"
      :style="attrs.style"
    >
      <slot name="content">
        <span v-if="rawContent" v-html="content" />
        <span v-else>{{ content }}</span>
      </slot>
      <div
        class="byte-tooltip-arrow byte-tooltip-arrow2"
        ref="byteTooltipArrow"
        data-popper-arrow
      ></div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { tooltipProps } from './tooltip'
import { computed, onMounted, ref, useAttrs, useSlots } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Placement } from '@popperjs/core'

defineOptions({
  name: 'ByteTooltip',
})
// attrs存储未被props接收的属性，eg. popperjs的额外的一些属性 => style之类的
const attrs = useAttrs()
const props = defineProps(tooltipProps)
const byteTooltipSlot = ref<HTMLElement>()
const byteTooltipContainer = ref<HTMLElement>()
const byteTooltipArrow = ref<HTMLElement>()
const effectClass = computed(() => {
  if (props.effect === 'dark') {
    return 'is-dark'
  } else {
    return 'is-light'
  }
})

const slots = useSlots()

const showTooltip = () => {
  ;(byteTooltipContainer.value as HTMLElement).style.visibility = 'visible'
  ;(byteTooltipArrow.value as HTMLElement).classList.remove(
    'byte-tooltip-arrow2'
  )
}

const hiddenTooltip = () => {
  ;(byteTooltipContainer.value as HTMLElement).style.visibility = 'hidden'
  ;(byteTooltipArrow.value as HTMLElement).classList.add('byte-tooltip-arrow2')
}

const dealClick = () => {
  showTooltip()
}

const dealMouseEnter = () => {
  if (props.trigger === 'hover') {
    showTooltip()
  }
}

const dealMouseLeave = () => {
  if (props.trigger === 'hover') {
    hiddenTooltip()
  }
}

const dealFocus = () => {
  console.log(1)

  if (props.trigger === 'focus') {
    showTooltip()
  }
}

const dealBlur = () => {
  if (props.trigger === 'focus') {
    hiddenTooltip()
  }
}

onMounted(() => {
  createPopper(
    byteTooltipSlot.value as HTMLElement,
    byteTooltipContainer.value as HTMLElement,
    {
      placement: props.placement as Placement,
      // modifiers: [
      //   {
      //     name: 'offset',
      //     options: {
      //       // 偏移值 上下，左右
      //       offset: [0, 6]
      //     }
      //   }
      // ]
    }
  )
})
</script>

<style lang="less" scoped>
@import './style.less';
</style>
