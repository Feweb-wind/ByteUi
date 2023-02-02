<template>
  <ByteToolTip
    ref="tooltipRef"
    v-bind="$attrs"
    :effect="effect"
    :content="content"
    :placement="placement"
    :disabled="disabled"
    :offset="offset"
    :show-after="showAfter"
    :tabindex="tabindex"
    :show-arrow="showArrow"
    :hide-after="hideAfter"
    :auto-close="autoClose"
    :trigger="trigger"
    :visible="visible"
  >
    <template v-if="$slots.reference">
      <slot name="reference" />
    </template>

    <template #content>
      <div v-if="title" role="title">
        {{ title }}
      </div>
      <slot>
        {{ content }}
      </slot>
    </template>
  </ByteToolTip>
</template>

<script setup lang="ts">
import { computed, ref, unref } from "vue";

import ByteToolTip from "@/components/tooltip";
import { popoverProps } from "./popover";
defineProps(popoverProps);

const tooltipRef = ref();
const popperRef = computed(() => {
  return unref(tooltipRef)?.popperRef;
});

const hide = () => {
  tooltipRef.value?.hide();
};

defineExpose({
  /** @description popper ref */
  popperRef,
  /** @description hide popover */
  hide,
});
</script>

<style></style>
