<template>
  <div :class="sliderClass" :disabled="disabled">
    <div
      ref="slider"
      class="slider_runway"
      :value="modelValue"
      @mousedown="updatePos"
    >
      <!-- 蓝条 -->
      <div class="slider_bar" :style="{ width: props.modelValue + '%' }"></div>
      <div
        v-draggable
        class="slider_btn-wrapper"
        :style="{ left: props.modelValue + '%' }"
        :disabled="disabled"
        :step="step"
        :min="min"
        :max="max"
      >
        <!-- 标记圆点 -->
        <div class="slider_btn"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, shallowRef } from "vue";

interface ElType extends HTMLElement {
  parentNode: any;
}

const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  step: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

// 获取slider
const slider = shallowRef<HTMLElement>();

// 自定义事件传值
const emit = defineEmits(["update:modelValue"]);

// 设置动态样式
const sliderClass = computed(() => {
  return [
    "byte-slider",
    {
      "byte-slider-disable": props.disabled,
    },
  ];
});

// 更新位置
const updatePos = (e: MouseEvent) => {
  // 先判断是否禁用
  if (props.disabled) {
    return;
  }
  // 记录新位置
  let newPercent = 0;
  // 获取鼠标位置
  let clientX = (e as MouseEvent).clientX;

  // 获取slider的偏移
  const sliderOffsetLeft = slider.value!.getBoundingClientRect().left;
  const sliderOffsetRight = slider.value!.getBoundingClientRect().right;

  // 修正位置，判断clientX是否超过slider的边界
  clientX = clientX < sliderOffsetLeft ? sliderOffsetLeft : 
  (clientX > sliderOffsetRight ?  sliderOffsetRight : clientX );

  // 获取滑动条的宽或高
  const sliderSize = slider.value?.offsetWidth;
  newPercent = Math.floor(((clientX - sliderOffsetLeft) / (sliderSize as number)) * 100);

  // 触发自定义事件
  emit("update:modelValue", newPercent);
};

// 实现拖拽自定义指令
const vDraggable = {
  beforeMount(el: ElType) {
    // 先判断是否禁用
    if (props.disabled) {
      return;
    }
    el.onmousedown = function (e) {
      el.style.cursor = "grabbing";
      document.onmousemove = function (e) {
        updatePos(e);
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
.byte-slider {
  // background-color: #ccc;
  width: 100%;
  height: 32px;
  padding: 5px 0;
  display: flex;
  align-items: center;

  .slider_runway {
    flex: 1;
    height: 6px;
    background-color: #e4e7ed;
    border-radius: 3px;
    position: relative;
    cursor: pointer;

    .slider_bar {
      height: 6px;
      // 根据位置动态设置宽度
      width: 20px;
      background-color: #409eff;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      position: absolute;
    }

    .slider_btn-wrapper {
      height: 36px;
      width: 36px;
      position: absolute;
      z-index: 1;
      // 需动态计算中心位置
      top: -15px;
      transform: translate(-50%);
      background-color: transparent;
      text-align: center;
      user-select: none;
      line-height: normal;
      outline: none;

      // 添加伪元素中心对齐
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
  }
}

// 控制禁用样式
.byte-slider-disable {
  .slider_runway {
    cursor: default;

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
