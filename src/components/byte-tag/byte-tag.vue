<template>
  <span
    :class="className"
  >
    <span><slot></slot></span>
    <span v-if="closable" @click.stop="handleClose">&nbsp;×</span>
  </span>
</template>

<script setup lang="ts">
import {computed, defineProps} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  closable: Boolean,
  disableTransitions: Boolean,
  hit: Boolean,
  color: String,
  size: {
    type: String,
    default: "default"
  },
  effect: {
    type: String,
    default: "light"
  },
  round: Boolean
});

const className = computed(() => {
  const type = props.type === "" ? "byte-tag" : `byte-tag byte-tag-${props.type}`;
  const size = props.size === "" ? "" : ` byte-tag-${props.size}`;

  return type + size;
});

</script>

<style lang="less" scoped>
@import "style.less";
</style>