<template>
  <div
      class="byte-tooltip-slot"
      @click="dealClick"
      ref="byteTooltipSlot"
  >
    <slot/>
  </div>
  <div
      class="byte-tooltip"
      ref="byteTooltipContainer"
      v-if="visible"
  >
    <template v-if="rawContent">
      <div v-text="content"></div>
    </template>
    <template v-else>
      <div v-html="content"></div>
    </template>
    <div
        class="byte-tooltip-arrow"
    >
    </div>
  </div>

</template>

<script lang="ts" setup>
import {tooltipProps} from "./tooltip";
import {computed, onMounted, ref} from "vue";
import {createPopper} from "@popperjs/core";
import type {Placement} from "@popperjs/core";

defineOptions({
  name: 'ByteTooltip'
});

const props = defineProps(tooltipProps);
const byteTooltipSlot = ref<HTMLElement>();
const byteTooltipContainer = ref<HTMLElement>();
const dealClick = () => {
  console.log("enter");
  (byteTooltipContainer.value as HTMLElement).style.visibility = "visible";
}

const arrowClass = computed(() => {
  const placement = props.placement;
  let classNames = "tooltip-arrow-";
  switch (placement) {
    case "top":
      classNames = "tooltip-arrow-top";
      break;
    case "top-start":
      classNames = "tooltip-arrow-top-start";
      break;
    case "top-end":
      classNames = "tooltip-arrow-top-end";
      break;
    case "bottom":
      classNames = "tooltip-arrow-bottom";
      break;
    case "bottom-start":
      classNames = "tooltip-arrow-bottom-start";
      break;
    case "bottom-end":
      classNames = "tooltip-arrow-bottom-end";
      break;
    case "left":
      classNames = "tooltip-arrow-left";
      break;
    case "left-start":
      classNames = "tooltip-arrow-left-start";
      break;
    case "left-end":
      classNames = "tooltip-arrow-left-end";
      break;
    case "right":
      classNames = "tooltip-arrow-right";
      break;
    case "right-start":
      classNames = "tooltip-arrow-right-start";
      break;
    case "right-end":
      classNames = "tooltip-arrow-right-end";
      break;
  }
  return classNames;
});

onMounted(() => {
  console.log("****", props.placement)
  createPopper(byteTooltipSlot.value as HTMLElement,
      byteTooltipContainer.value as HTMLElement,
      {
        placement: (props.placement as Placement)
      }
  )
})

// onMounted(() => {
//   const slotInfo = getBoundingClientRect(byteTooltipSlot.value as HTMLElement);
//   const tooltipInfo = getBoundingClientRect(byteTooltipContainer.value as HTMLElement);
//
//   let styleStr = "";
//   if (props.placement.indexOf('bottom') !== -1) {
//     const { bottom, left, width } = slotInfo;
//     styleStr += `top: ${bottom + props.offset + 8}px;`;
//     styleStr += `left: ${left}px`;
//   }
//   else if (props.placement.indexOf('top') !== -1) {
//     console.log(slotInfo)
//     const { top, left, width } = slotInfo;
//     const { height } = tooltipInfo;
//     styleStr += `top: ${top - height - props.offset - 8}px;`;
//     styleStr += `left: ${left}px`;
//   }
//   console.log(slotInfo.top, styleStr, byteTooltipContainer.value);
//   (byteTooltipContainer.value as HTMLElement).style.cssText = styleStr;
// })
</script>

<style lang="less" scoped>
//@import "./style.less";


.byte-tooltip {
  display: inline-block;
  background: #ffffff;
  color: #643045;
  font-weight: bold;
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 4px;

  .byte-tooltip-arrow,
  .byte-tooltip-arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
  }

  .byte-tooltip-arrow {
    visibility: hidden;
  }

  .byte-tooltip-arrow::before {
    visibility: visible;
    content: '';
    transform: rotate(45deg);
  }

  &[data-popper-placement^='top'] > .byte-tooltip-arrow {
    bottom: -4px;
  }

  &[data-popper-placement='top'] > .byte-tooltip-arrow {
    left: 50%;
    transform: translate(-50%, 0);
  }

  &[data-popper-placement='top-start'] > .byte-tooltip-arrow {
    left: 10%;
  }

  &[data-popper-placement='top-end'] > .byte-tooltip-arrow {
    right: 10%;
  }

  &[data-popper-placement^='bottom'] > .byte-tooltip-arrow {
    top: -4px;
  }

  &[data-popper-placement='bottom'] > .byte-tooltip-arrow {
    left: 50%;
    transform: translate(-50%, 0);
  }

  &[data-popper-placement='bottom-start'] > .byte-tooltip-arrow {
    left: 10%;
  }

  &[data-popper-placement='bottom-end'] > .byte-tooltip-arrow {
    right: 10%;
  }

  &[data-popper-placement^='left'] > .byte-tooltip-arrow {
    right: -4px;
  }

  &[data-popper-placement='left'] > .byte-tooltip-arrow {
    bottom: 50%;
    transform: translate(0, 50%);
  }

  &[data-popper-placement='left-start'] > .byte-tooltip-arrow {
    top: 10%;
  }

  &[data-popper-placement='left-end'] > .byte-tooltip-arrow {
    bottom: 10%;
  }

  &[data-popper-placement^='right'] > .byte-tooltip-arrow {
    left: -4px;
  }

  &[data-popper-placement='right'] > .byte-tooltip-arrow {
    bottom: 50%;
    transform: translate(0, 50%);
  }

  &[data-popper-placement='right-start'] > .byte-tooltip-arrow {
    top: 10%;
  }

  &[data-popper-placement='right-end'] > .byte-tooltip-arrow {
    bottom: 10%;
  }
}
</style>