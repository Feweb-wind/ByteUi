<template>
  <button
      :class="[sizeClass, typeClass, plainClass,
    roundClass, textClass, bgClass, disabledClass,
    linkClass, circleClass, loadingClass
    ]"
      class="byte-button"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading"/>
      <byte-icon v-else :class="loadingClass">
        <component :is="loadingIcon"/>
      </byte-icon>
    </template>
    <byte-icon v-if="icon">
      <component :is="icon"/>
      <slot name="icon"></slot>
    </byte-icon>
    <span
        v-if="$slots.default"
    >
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup>
import {buttonEmits, buttonProps} from "./button.ts";
import {ByteIcon} from "@byte-ui/components";

defineOptions({
  name: 'ByteButton',
});
const props = defineProps(buttonProps);
const emit = defineEmits(buttonEmits);

const sizeClass = props.size === "default" ? "" : "byte-button-" + props.size;
const typeClass = props.type === undefined ? "" : "byte-button-" + props.type;
const plainClass = props.plain ? "is-plain" : "";
const roundClass = props.round ? "is-round" : "";
const disabledClass = props.disabled ? "is-disabled" : "";
const textClass = "";
const bgClass = "";
const linkClass = props.link ? "is-link" : "";
const circleClass = props.circle ? "is-circle" : "";
const loadingClass = props.loading ? "is-loading" : "";

</script>

<style lang="less" scoped>
@import "./style.less";
</style>