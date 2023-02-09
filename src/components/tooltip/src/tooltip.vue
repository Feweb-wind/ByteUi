<template>
  <!-- 用来触发tooltip的元素 trigger -->
  <div
      class="byte-tooltip-slot"
      @click="dealClick"
      @mouseenter="dealMouseEnter"
      @mouseleave="dealMouseLeave"
      ref="byteTooltipSlot"
  >
    <slot name="default"></slot>
  </div>

  <!-- tooltip弹出框 -->
  <div
      v-if="!disabled"
      class="byte-tooltip"
      :class="effectClass"
      ref="byteTooltipContainer"
      aria-describedby="tooltip"
      :style="attrs.style"
      @mouseenter="dealTooltipMouseEnter"
      @mouseleave="dealTooltipMouseLeave"
  >
    <!-- tooltip主要内容 -->
    <slot name="content">
      <span v-if="rawContent" v-html="content"/>
      <span v-else>{{content}}</span>
    </slot>
    <!-- tooltip箭头 -->
    <div
        class="byte-tooltip-arrow"
        ref="byteTooltipArrow"
        data-popper-arrow
    >
    </div>
  </div>

</template>

<script lang="ts" setup>
import {tooltipProps, checkIn} from "./tooltip.ts";
import {computed, onMounted, ref, useAttrs} from "vue";
import {createPopper, hide} from "@popperjs/core";
// 涉及到的ts类型使用 https://popper.js.org/docs/v2/typings/
import type {Placement} from "@popperjs/core";
import type { StrictModifiers } from '@popperjs/core';

defineOptions({
  name: 'ByteTooltip'
});
// attrs存储未被props接收的属性，eg. popperjs的额外的一些属性 => style之类的
const attrs = useAttrs();
const props = defineProps(tooltipProps);
const byteTooltipSlot = ref<HTMLElement|null>(null);
const byteTooltipContainer = ref<HTMLElement|null>(null);
const byteTooltipArrow = ref<HTMLElement|null>(null);

const open = ref<Boolean>(false);
// 隐藏和显示tooltip的时间
const hideAfterTime = ref<string>(`${props.hideAfter}ms`);
const showAfterTime = ref<string>(`${props.showAfter}ms`);

const effectClass = computed(() => {
  if (props.effect === "dark") {
    return "is-dark";
  }
  else {
    return "is-light";
  }
});

const tooltipVisible = ref<string>('hidden');

// 控制隐藏tooltip
function hideTooltip() {
  byteTooltipContainer.value?.classList.remove('show');
  byteTooltipContainer.value?.classList.add('hide');
}

// 控制显示tooltip
function showTooltip() {
  byteTooltipContainer.value?.classList.remove('hide');
  byteTooltipContainer.value?.classList.add('show');
}

const dealClick = () => {
  if (props.trigger === 'click') {
    tooltipVisible.value = 'visible';
  }
}

// 鼠标进入trigger元素
const dealMouseEnter = () => {
  if (props.trigger === "hover") {
    tooltipVisible.value = 'visible';
    showTooltip();
  }
}

// 鼠标离开trigger元素
const dealMouseLeave = () => {
  if (props.trigger === "hover") {
    hideTooltip();
  }
}

// 鼠标进入tooltip元素
const dealTooltipMouseEnter = () => {
  // 如果弹出框可进入  =>  鼠标移出trigger之后进入tooltip之后弹出框仍然显示
  if (props.enterable) {
    showTooltip();
  }
}

// 鼠标离开tooltip元素
const dealTooltipMouseLeave = () => {
  if (props.enterable) {
    hideTooltip();
  }
}

onMounted(() => {

  // 弹框未被禁用
  if (!props.disabled) {
    createPopper<StrictModifiers>(byteTooltipSlot.value as HTMLElement,
        byteTooltipContainer.value as HTMLElement,
        {
          placement: (props.placement as Placement),
          modifiers: [
            {
              name: 'offset',
              options: {
                // 偏移值 上下，左右
                offset: [-2, 6]
              }
            }
          ]
        }
    )
  }
});

// 虚拟触发 https://popper.js.org/docs/v2/virtual-elements/
</script>

<style lang="less" scoped>

@keyframes show-tooltip {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes hide-tooltip {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.show {
  animation: show-tooltip v-bind(showAfterTime) ease-in forwards;
}

.hide {
  animation: hide-tooltip v-bind(hideAfterTime) ease-in forwards;
}

.byte-tooltip-slot {
  display: inline-block;
}
.byte-tooltip {
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 4px;
  display: inline-block;
  visibility: v-bind(tooltipVisible);
  z-index: 2000;

  &.is-dark {
    background: #1a1a1a;
    color: #ffffff;
  }

  &.is-light {
    background: #ffffff;
    border: #d9d9d9 solid 1px;
    color: #1a1a1a;

    .byte-tooltip-arrow::before {
      border: #d9d9d9 solid 1px;
    }
  }

  .byte-tooltip-arrow,
  .byte-tooltip-arrow::before {
    z-index: -1;
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
  }

  .byte-tooltip-arrow {
    visibility: hidden;
  }

  .byte-tooltip-arrow::before {
    visibility: v-bind(tooltipVisible);
    content: '';
    transform: rotate(45deg);
  }

  .byte-tooltip-arrow2::before {
    visibility: hidden;
    content: '';
    transform: rotate(45deg);
  }

  &[data-popper-placement^='top'] {
    .byte-tooltip-arrow {
      bottom: -4px;
    }
    .byte-tooltip-arrow::before {
      border-left: transparent;
      border-top: transparent;
    }
  }

  &[data-popper-placement^='bottom'] {
    .byte-tooltip-arrow {
      top: -4px;
    }
    .byte-tooltip-arrow::before {
      border-right: transparent;
      border-bottom: transparent;
    }
  }

  &[data-popper-placement^='left'] {
    .byte-tooltip-arrow {
      right: -4px;
    }
    .byte-tooltip-arrow::before {
      border-left: transparent;
      border-bottom: transparent;
    }
  }

  &[data-popper-placement^='right'] {
    .byte-tooltip-arrow {
      left: -4px;
    }
    .byte-tooltip-arrow::before {
      border-right: transparent;
      border-top: transparent;
    }
  }
}
</style>