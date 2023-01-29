<template>
  <!-- 横向 -->
  <ByteThumb :move="moveX" :ratio="ratioX" :size="width" :always="always" />
  <!-- 纵向 -->
  <ByteThumb
    :move="moveY"
    :ratio="ratioY"
    :size="height"
    vertical
    :always="always"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { GAP } from "./util";
import ByteThumb from "./byte-thumb.vue";

const props = defineProps({
  always: {
    type: Boolean,
    default: true,
  },
  width: String,
  height: String,
  ratioX: {
    type: Number,
    default: 1,
  },
  ratioY: {
    type: Number,
    default: 1,
  },
});

// 滑块移动的距离
const moveX = ref(0);
const moveY = ref(0);

const handleScroll = (wrap: HTMLDivElement) => {
  if (wrap) {
    const offsetHeight = wrap.offsetHeight - GAP;
    const offsetWidth = wrap.offsetWidth - GAP;

    moveY.value = ((wrap.scrollTop * 100) / offsetHeight) * props.ratioY;
    moveX.value = ((wrap.scrollLeft * 100) / offsetWidth) * props.ratioX;
  }
};

defineExpose({
  handleScroll,
});
</script>
