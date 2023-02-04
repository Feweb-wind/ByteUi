<template>
  <transition name="fade">
    <!-- 滑轨 -->
    <div
      v-show="always || visible"
      ref="instance"
      :class="barClass"
      @mousedown="clickTrackHandler"
    >
      <!-- 滑块 -->
      <div
        ref="thumb"
        class="byte-scrollbar_thumb"
        :style="thumbStyle"
        @mousedown="clickThumbHandler"
      />
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, inject, onBeforeUnmount, ref, toRef,CSSProperties } from "vue";
import { thumbProps, renderThumbStyle, BAR_MAP } from "./thumb";
import {
  scrollbarContextKey,
  type ScrollbarContext,
  isClient,
  useEventListener,
} from "./util";

defineOptions({
  name: "ByteScrollThumb",
});

const props = defineProps(thumbProps);

const scrollbar = inject(scrollbarContextKey) as ScrollbarContext;
if (!scrollbar) Promise.reject("can not inject scrollbar context");

const instance = ref<HTMLDivElement>();
const thumb = ref<HTMLDivElement>();

const thumbState = ref<Partial<Record<"X" | "Y", number>>>({});
const visible = ref(false);

let cursorDown = false;
let cursorLeave = false;

// 保存文本选择函数
let originalOnSelectStart:
  | ((this: GlobalEventHandlers, ev: Event) => any)
  | null = isClient ? document.onselectstart : null;

const bar = computed(() => BAR_MAP[props.vertical ? "vertical" : "horizontal"]);

const thumbStyle = computed(() =>
  renderThumbStyle({
    size: props.size,
    move: props.move,
    bar: bar.value,
  })
);

const offsetRatio = computed(
  () =>
    instance.value![bar.value.offset] ** 2 /
    scrollbar.wrapElement![bar.value.scrollSize] /
    props.ratio /
    thumb.value![bar.value.offset]
);

const barClass = computed(() => {
  return [
    "byte-scrollbar_bar",
    {
      "is-vertical": props.vertical,
      "is-horizontal": !props.vertical,
    },
  ];
});



// 滑块拖拽入口，鼠标按下
const clickThumbHandler = (e: MouseEvent) => {
  // prevent click event of middle and right button
  e.stopPropagation();
  if (e.ctrlKey || [1, 2].includes(e.button)) return;

  window.getSelection()?.removeAllRanges();
  startDrag(e);

  const el = e.currentTarget as HTMLDivElement;
  if (!el) return;
  thumbState.value[bar.value.axis] =
    el[bar.value.offset] -
    (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction]);
};

// 拖动核心逻辑，滑块的中心所占位置映射到 “scrollTop||scrollLeft”
const clickTrackHandler = (e: MouseEvent) => {
  if (!thumb.value || !instance.value || !scrollbar.wrapElement) return;

  const offset = Math.abs(
    (e.target as HTMLElement).getBoundingClientRect()[bar.value.direction] -
      e[bar.value.client]
  );
  const thumbHalf = thumb.value[bar.value.offset] / 2;
  const thumbPositionPercentage =
    ((offset - thumbHalf) * offsetRatio.value) /
    instance.value[bar.value.offset];

  scrollbar.wrapElement[bar.value.scroll] =
    thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize];
};

const startDrag = (e: MouseEvent) => {
  e.stopImmediatePropagation();
  cursorDown = true;
  document.addEventListener("mousemove", mouseMoveDocumentHandler);
  document.addEventListener("mouseup", mouseUpDocumentHandler);

  originalOnSelectStart = document.onselectstart;
  document.onselectstart = () => false;
};

const mouseMoveDocumentHandler = (e: MouseEvent) => {
  if (!instance.value || !thumb.value) return;
  if (cursorDown === false) return;

  const prevPage = thumbState.value[bar.value.axis];
  if (!prevPage) return;

  const offset =
    (instance.value.getBoundingClientRect()[bar.value.direction] -
      e[bar.value.client]) *
    -1;
  const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
  const thumbPositionPercentage =
    ((offset - thumbClickPosition) * 100 * offsetRatio.value) /
    instance.value[bar.value.offset];
  scrollbar.wrapElement[bar.value.scroll] =
    (thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize]) /
    100;
};

const mouseUpDocumentHandler = () => {
  cursorDown = false;
  thumbState.value[bar.value.axis] = 0;
  document.removeEventListener("mousemove", mouseMoveDocumentHandler);
  document.removeEventListener("mouseup", mouseUpDocumentHandler);
  restoreOnselectstart();
  if (cursorLeave) visible.value = false;
};

const mouseMoveScrollbarHandler = () => {
  cursorLeave = false;
  visible.value = !!props.size;
};

const mouseLeaveScrollbarHandler = () => {
  cursorLeave = true;
  visible.value = cursorDown;
};

onBeforeUnmount(() => {
  restoreOnselectstart();
  document.removeEventListener("mouseup", mouseUpDocumentHandler);
});

// 重置文本选择函数
const restoreOnselectstart = () => {
  if (document.onselectstart !== originalOnSelectStart)
    document.onselectstart = originalOnSelectStart;
};

useEventListener(
  toRef(scrollbar, "scrollbarElement"),
  "mousemove",
  mouseMoveScrollbarHandler
);
useEventListener(
  toRef(scrollbar, "scrollbarElement"),
  "mouseleave",
  mouseLeaveScrollbarHandler
);
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.byte-scrollbar_bar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 1;
  border-radius: 4px;
  &.is-vertical {
    width: 6px;
    top: 2px;

    & > div {
      width: 100%;
    }
  }

  &.is-horizontal {
    height: 6px;
    left: 2px;

    & > div {
      height: 100%;
    }
  }

  .byte-scrollbar_thumb {
    position: relative;
    display: block;
    width: 0;
    height: 0;
    cursor: pointer;
    border-radius: inherit;
    background-color: #909399;
    transition: 0.3s background-color;
    opacity: 0.5;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
