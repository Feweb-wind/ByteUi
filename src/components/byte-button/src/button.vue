<template>
  <button
      :class="[sizeClass, typeClass, plainClass,
    roundClass, textClass, bgClass, disabledClass,
    linkClass, circleClass, loadingClass
    ]"
      class="byte-button"
  >
    <slot></slot>
    <byte-icon v-if="icon">
      <component :is="icon"/>
      <slot name="icon"></slot>
    </byte-icon>
  </button>
</template>

<script lang="ts" setup>
import {buttonEmits, buttonProps} from "./button.ts";
import ByteIcon from "../../byte-icon/src/byte-icon.vue"

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
const linkClass = "";
const circleClass = props.circle ? "is-circle" : "";
const loadingClass = "";

</script>

<style lang="less" scoped>
@import "./style.less";
</style>