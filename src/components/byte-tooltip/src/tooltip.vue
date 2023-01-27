<template>
  <div
      class="byte-tooltip-slot"
      @click="dealClick"
      @mouseenter="dealMouseEnter"
      @mouseleave="dealMouseLeave"
      ref="byteTooltipSlot"
  >
    <slot/>
  </div>
  <div
      class="byte-tooltip"
      :class="effectClass"
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
        class="byte-tooltip-arrow byte-tooltip-arrow2"
        ref="byteTooltipArrow"
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
const byteTooltipArrow = ref<HTMLElement>();
const effectClass = computed(() => {
  if (props.effect === "dark") {
    return "is-dark";
  }
  else {
    return "is-light";
  }
});
const dealClick = () => {
  console.log("enter");
  (byteTooltipContainer.value as HTMLElement).style.visibility = "visible";
  (byteTooltipArrow.value as HTMLElement).style.visibility = "visible";
}

onMounted(() => {
  createPopper(byteTooltipSlot.value as HTMLElement,
      byteTooltipContainer.value as HTMLElement,
      {
        placement: (props.placement as Placement),
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
});

const dealMouseEnter = () => {
  if (props.trigger === "hover") {
    (byteTooltipContainer.value as HTMLElement).style.visibility = "visible";
    (byteTooltipArrow.value as HTMLElement).classList.remove("byte-tooltip-arrow2");
  }
}

const dealMouseLeave = () => {
  if (props.trigger === "hover") {
    (byteTooltipContainer.value as HTMLElement).style.visibility = "hidden";
    (byteTooltipArrow.value as HTMLElement).classList.add("byte-tooltip-arrow2");
  }
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>