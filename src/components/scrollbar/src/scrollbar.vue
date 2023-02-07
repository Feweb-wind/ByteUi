<template>
  <div ref="scrollbarRef" class="byte-scrollbar">
    <div ref="wrapRef" :class="wrapKls" :style="style" @scroll="handleScroll">
      <component :is="tag" ref="resizeRef" :style="viewStyle" :class="viewClass">
        <slot />
      </component>
    </div>
    <template v-if="!native">
      <bar
        ref="barRef"
        :height="sizeHeight"
        :width="sizeWidth"
        :always="always"
        :ratioX="ratioX"
        :ratioY="ratioY"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  nextTick,
  onMounted,
  onUpdated,
  provide,
  reactive,
  ref,
  watch,
  CSSProperties,
  StyleValue,
} from "vue";
import {
  GAP,
  scrollbarContextKey,
  definePropType,
  useEventListener,
  isNumber,
  isObject,
  useResizeObserver,
  BarInstance,
} from "./util";
import Bar from "./bar.vue";

defineOptions({
  name: "ByteScrollbar",
});

const props = defineProps({
  /**
   * @description height of scrollbar
   */
  height: {
    type: [String, Number],
    default: "",
  },
  /**
   * @description max height of scrollbar
   */
  maxHeight: {
    type: [String, Number],
    default: "",
  },
  /**
   * @description whether to use the native scrollbar
   */
  native: {
    type: Boolean,
    default: false,
  },
  /**
   * @description style of wrap
   */
  wrapStyle: {
    type: definePropType<StyleValue>([String, Object, Array]),
    default: "",
  },
  /**
   * @description class of wrap
   */
  wrapClass: {
    type: [String, Array],
    default: "",
  },
  /**
   * @description class of view
   */
  viewClass: {
    type: [String, Array],
    default: "",
  },
  /**
   * @description style of view
   */
  viewStyle: {
    type: [String, Array, Object],
    default: "",
  },
  /**
   * @description 不响应容器尺寸变化
   */
  noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
  /**
   * @description element tag of the view
   */
  tag: {
    type: String,
    default: "div",
  },
  /**
   * @description always show
   */
  always: Boolean,
  /**
   * @description minimum size of scrollbar
   */
  minSize: {
    type: Number,
    default: 20,
  },
});

const emit = defineEmits({
  // 校验scroll事件
  scroll: ({
    scrollTop,
    scrollLeft,
  }: {
    scrollTop: number;
    scrollLeft: number;
  }) => [scrollTop, scrollLeft].every(isNumber),
});

let stopResizeObserver: (() => void) | undefined = undefined;
let stopResizeListener: (() => void) | undefined = undefined;

const scrollbarRef = ref<HTMLDivElement>();
const wrapRef = ref<HTMLDivElement>();
const resizeRef = ref<HTMLElement>();
const barRef = ref<BarInstance>();

// 设置滑块的尺寸（长度）
const sizeWidth = ref("0");
const sizeHeight = ref("0");

// 根据滑块的尺寸计算比例系数
const ratioY = ref(1);
const ratioX = ref(1);

// 设置自定义高度
const style = computed<StyleValue>(() => {
  const style: CSSProperties = {};
  if (props.height) {
    if (isNumber(props.height)) {
      style.height = props.height + "px";
    } else {
      // 需校验字符串
      style.height = props.height;
    }
  }
  if (props.maxHeight) {
    if (isNumber(props.maxHeight)) {
      style.maxHeight = props.maxHeight + "px";
    } else {
      style.maxHeight = props.maxHeight;
    }
  }
  return [props.wrapStyle, style];
});

// 原始滚动条隐藏动态样式
const wrapKls = computed(() => {
  return [
    props.wrapClass,
    "byte-scrollbar_wrap",
    // 隐藏原始滑动条
    { "byte-scrollbar__wrap--hidden-default": !props.native },
  ];
});

// 外部调用函数
const handleScroll = () => {
  if (wrapRef.value) {
    barRef.value?.handleScroll(wrapRef.value);

    // 当触发滚动事件时，返回滚动的距离
    emit("scroll", {
      scrollTop: wrapRef.value.scrollTop,
      scrollLeft: wrapRef.value.scrollLeft,
    });
  }
};

// TODO: refactor method overrides, due to script setup dts
// @ts-nocheck
function scrollTo(xCord: number, yCord?: number): void;
function scrollTo(options: ScrollToOptions): void;
function scrollTo(arg1: any, arg2?: number) {
  if (isObject(arg1)) {
    wrapRef.value!.scrollTo(arg1);
  } else if (isNumber(arg1) && isNumber(arg2)) {
    wrapRef.value!.scrollTo(arg1, arg2);
  }
}

const setScrollTop = (value: number) => {
  if (!isNumber(value)) {
    return;
  }
  wrapRef.value!.scrollTop = value;
};

const setScrollLeft = (value: number) => {
  if (!isNumber(value)) {
    return;
  }
  wrapRef.value!.scrollLeft = value;
};

// 更新滑块状态（滑块的位置 + 滑块的尺寸）
const update = () => {
  if (!wrapRef.value) return;
  const offsetHeight = wrapRef.value.offsetHeight - GAP;
  const originalHeight = offsetHeight ** 2 / wrapRef.value.scrollHeight;
  const height = Math.max(originalHeight, props.minSize);

  // 若height = originalHeight则比例系数为1
  ratioY.value =
    originalHeight /
    (offsetHeight - originalHeight) /
    (height / (offsetHeight - height));

  // 判断滑块的尺寸是否超出容器高度
  sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : "";

  const offsetWidth = wrapRef.value.offsetWidth - GAP;
  const originalWidth = offsetWidth ** 2 / wrapRef.value.scrollWidth;
  const width = Math.max(originalWidth, props.minSize);

  ratioX.value =
    originalWidth /
    (offsetWidth - originalWidth) /
    (width / (offsetWidth - width));

  sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : "";
};

watch(
  () => props.noresize,
  (noresize) => {
    if (noresize) {
      stopResizeObserver?.();
      stopResizeListener?.();
    } else {
      ({ stop: stopResizeObserver } = useResizeObserver(resizeRef, update));
      stopResizeListener = useEventListener("resize", update);
    }
  },
  { immediate: true }
);

watch(
  () => [props.maxHeight, props.height],
  () => {
    if (!props.native)
      nextTick(() => {
        update();
        if (wrapRef.value) {
          barRef.value?.handleScroll(wrapRef.value);
        }
      });
  }
);

provide(
  scrollbarContextKey,
  reactive({
    scrollbarElement: scrollbarRef,
    wrapElement: wrapRef,
  })
);

onMounted(() => {
  if (!props.native)
    nextTick(() => {
      update();
    });
});

onUpdated(() => update());

defineExpose({
  /** @description scrollbar wrap ref */
  wrapRef,
  /** @description update scrollbar state manually */
  update,
  /** @description scrolls to a particular set of coordinates */
  scrollTo,
  /** @description set distance to scroll top */
  setScrollTop,
  /** @description set distance to scroll left */
  setScrollLeft,
  /** @description handle scroll event */
  handleScroll,
});
</script>

<style lang="less" scoped>
.byte-scrollbar {
  overflow: hidden;
  position: relative;
  height: 100%;

  .byte-scrollbar_wrap {
    overflow: auto;
    height: 100%;
  }
}

// 覆盖原生滚动条样式
.byte-scrollbar__wrap--hidden-default {
  scrollbar-width: none;
}
.byte-scrollbar__wrap--hidden-default::-webkit-scrollbar {
  display: none;
}

// 覆盖原生滚动条样式
// ::-webkit-scrollbar {
//   width: 6px;
// }
// ::-webkit-scrollbar-track {
//   border-radius: 10px;
// }
</style>
