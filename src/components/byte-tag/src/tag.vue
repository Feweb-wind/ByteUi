<template>
  <span
      v-if="disableTransitions"
      :class="className"
      :style="{ backgroundColor: color }"
      @click="handleClick"
  >
    <span class="byte-tag-content">
        <slot></slot>
        <byte-icon
            v-if="closable"
            @click.stop="handleClose"

        >
          <Close/>
        </byte-icon>
      <byte-icon
          v-if="closable"
          v-show="!visible"
          @click.stop="handleClose"
          @mouseleave="changeVisible"
      >
          <CircleCloseFilled/>
        </byte-icon>
    </span>
  </span>

  <transition name="byte-tag-zoom-in-enter" v-else appear>
    <span
        :class="className"
        :style="{ backgroundColor: color }"
        @click="handleClick"
    >
      <span class="byte-tag-content">
        <slot></slot>
        <byte-icon
            v-if="closable"
            v-show="visible"
            @click.stop="handleClose"
            @mouseenter="changeVisible"
        >
          <Close/>
        </byte-icon>
        <byte-icon
            v-if="closable"
            v-show="!visible"
            @click.stop="handleClose"
            @mouseleave="changeVisible"
        >
          <CircleCloseFilled/>
        </byte-icon>
      </span>
    </span>
  </transition>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {tagEmits, tagProps} from "./tag.ts";
import {ByteIcon} from "@byte-ui/components";
import {Close, CircleCloseFilled} from "@element-plus/icons-vue";

defineOptions({
  name: 'ByteTag',
});
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
  // hit: true false 是否有边框描边
  const hit: string = props.hit ? `byte-tag-hit` : ``;

  return type + size + effect + round + hit;
});

const visible = ref<boolean>(true);

const handleClose = (event: MouseEvent) => {
  emit('close', event);
}

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}

const changeVisible = () => {
  visible.value = !visible.value;
}

</script>

<style lang="less" scoped>
@import "style.less";
</style>