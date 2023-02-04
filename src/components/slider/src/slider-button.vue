<template>
  <div
    v-draggable
    ref="button"
    class="slider_btn-wrapper"
    :style="btnWrapStyle"
  >
    <byte-tooltip :placement="placement">
      <template #content>
        {{ modelValue }}
      </template>
      <!-- 标记点 -->
      <div class="slider_btn" />
    </byte-tooltip>
  </div>
</template>

<script setup lang="ts">
import { placements } from '@popperjs/core'
import { inject, StyleValue } from 'vue';
import ByteTooltip from '@/components/tooltip/index';

defineOptions({
  name: "ByteSliderButton",
});

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  vertical: Boolean,
  showTooltip: {
    type: Boolean,
    default: true,
  },
  placement: {
    type: String,
    value: placements,
    default: 'top',
  },
  disabled: Boolean,
});

// 设置自定义事件类型
const emit = defineEmits<{
  (e: 'update', value: MouseEvent) : void
}>();

const btnWrapStyle = inject('SliderKey') as StyleValue;

// 实现拖拽自定义指令
const vDraggable = {
  beforeMount(el: HTMLElement) {
    // 先判断是否禁用
    if (props.disabled) {
      return;
    }
    el.onmousedown = function (e) {
      el.style.cursor = "grabbing";
      // e.stopPropagation();
      // 需节流
      document.onmousemove = function (e) {
        // 触发自定义事件
        emit('update', e);
      }
      // 解除事件回调函数
      document.onmouseup = function () {
        el.style.cursor = "grab";
        document.onmousemove = document.onmouseup = null;
      };
    };
  },
};

</script>

<style lang="less" scoped>
.slider_btn-wrapper {
  height: 36px;
  width: 36px;
  position: absolute;
  z-index: 1;
  top: -15px;
  transform: translate(-50%);
  background-color: transparent;
  text-align: center;
  user-select: none;
  line-height: normal;
  outline: none;

  // 添加伪元素使中心对齐
  &:after {
    display: inline-block;
    content: "";
    height: 100%;
    vertical-align: middle;
  }

  &:hover {
    cursor: grab;
  }

  .slider_btn {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    border: solid 2px #409eff;
    background-color: #fff;
    border-radius: 50%;
    box-sizing: border-box;
    transition: 0.2s ease-in-out;
    user-select: none;

    &:hover {
      transform: scale(1.2);
    }
  }
}

// 控制禁用样式
.byte-slider-disable {
  .slider_runway {
    .slider_btn-wrapper {
      &:hover {
        cursor: not-allowed;
      }
      .slider_btn {
        border-color: #a8abb2;
        &:hover {
          transform: scale(1);
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
