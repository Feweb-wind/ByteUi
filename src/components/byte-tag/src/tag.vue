<template>
  <span
      v-if="disableTransitions"
      :class="className"
      :style="{ backgroundColor: color }"
      @click="handleClick"
  >
    <span><slot></slot></span>
    <span v-if="closable" @click.stop="handleClose">×</span>
  </span>

  <transition v-else appear>
    <span
        :class="className"
        :style="{ backgroundColor: color }"
        @click="handleClick"
    >
      <span><slot></slot></span>
    <span v-if="closable" @click.stop="handleClose">×</span>
    </span>
  </transition>
</template>

<script lang="ts" setup>
import {computed, defineProps} from "vue";
import {tagEmits, tagProps} from "@/components/byte-tag/src/tag";

const emit = defineEmits(tagEmits);
const props = defineProps(tagProps);

const className = computed(() => {
  // type: [primary] warning, info, danger, success
  const type: string = props.type === "" ? "byte-tag byte-tag-primary" : `byte-tag byte-tag-${props.type}`;
  // size: large, small, default
  const size: string = props.size === "" ? "" : ` byte-tag-${props.size}`;
  // effect: light, dark, plain
  const effect: string = props.effect === "" ? ` byte-tag-light` : ` byte-tag-${props.effect}`;
  // round: true, false
  const round: string = props.round ? ` byte-tag-round` : ``;

  return type + size + effect + round;
});

const handleClose = (event: MouseEvent) => {
  emit('close', event);
}

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}

</script>

<style lang="less" scoped>
@import "style.less";
</style>