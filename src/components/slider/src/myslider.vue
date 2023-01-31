<template>
  <div :class="sliderClass">
    <!-- 滑轨 -->
    <div
      ref="slider"
      class="slider_runway"
      :style="runwayStyle"
      :value="modelValue"
      @mousedown="updatePos"
    >
      <!-- 已划过的滑轨 -->
      <div class="slider_bar" :style="barStyle"></div>
      <div
        v-draggable
        class="slider_btn-wrapper"
        :style="btnWrapStyle"
        :disabled="disabled"
        :step="step"
        :min="min"
        :max="max"
      >
        <!-- 标记点 -->
        <div class="slider_btn"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, shallowRef } from "vue";

interface ElType extends HTMLElement {
  parentNode: any;
}

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  height: String,
  debounce: {
    type: Number,
    default: 300,
  },
  // range: Boolean,
  // showInput: Boolean,
  // showInputControls: {
  //   type: Boolean,
  //   default: true,
  // },
  // size: useSizeProp,
  // inputSize: useSizeProp,
  // showStops: Boolean,
  // showTooltip: {
  //   type: Boolean,
  //   default: true,
  // },
  // formatTooltip: {
  //   type: definePropType<(val: number) => number | string>(Function),
  //   default: undefined,
  // },
  // tooltipClass: {
  //   type: String,
  //   default: undefined,
  // },
  // placement: {
  //   type: String,
  //   values: placements,
  //   default: 'top',
  // },
});

// 获取slider
const slider = shallowRef<HTMLElement>();

const emit = defineEmits(["update:modelValue"]);

// 设置范围选择初始值
const initData = reactive({
  firstValue: 0,
  secondValue: 0,
  oldValue: 0,
  dragging: false,
  sliderSize: 1,
})

// 设置动态样式
const sliderClass = computed(() => {
  return [
    "byte-slider",
    {
      "byte-slider-disable": props.disabled,
    },
    {
      "is-vertical": props.vertical
    }
  ];
});

const barStyle = computed(() => {
  return props.vertical
    ? {
        height: `${ (100 * (props.modelValue - props.min)) / (props.max - props.min) }%`,
        bottom: '0%',
      }
    : {
        width: `${(100 * (props.modelValue - props.min)) / (props.max - props.min) }%`,
        left: '0%',
      }
})

const runwayStyle = computed(() => {
  return props.vertical ? { height: props.height } : {}
})

const btnWrapStyle = computed(() => {
  return props.vertical ? { bottom: props.modelValue + '%' } : { left: props.modelValue + '%' }
})

// 更新位置
const updatePos = (e: MouseEvent) => {
  // 先判断是否禁用
  if (props.disabled) {
    return;
  }
  // 记录新位置
  let newPercent = 0;
  
  if (props.vertical) {
    let clientY = (e as MouseEvent).clientY;
    const sliderOffsetBottom = slider.value!.getBoundingClientRect().bottom;
    const sliderOffsetTop = slider.value!.getBoundingClientRect().top;

    // 修正位置
    clientY = clientY < sliderOffsetTop ? sliderOffsetTop : 
    (clientY > sliderOffsetBottom ?  sliderOffsetBottom : clientY );

    const sliderSize = slider.value?.offsetHeight;
    newPercent = ((sliderOffsetBottom - clientY) / (sliderSize as number)) * 100;

  } else {
    // 获取鼠标位置
    let clientX = (e as MouseEvent).clientX;

    // 获取slider的偏移
    const sliderOffsetLeft = slider.value!.getBoundingClientRect().left;
    const sliderOffsetRight = slider.value!.getBoundingClientRect().right;

    // 修正位置，判断clientX是否超过slider的边界
    clientX = clientX < sliderOffsetLeft ? sliderOffsetLeft : 
    (clientX > sliderOffsetRight ?  sliderOffsetRight : clientX );

    // 获取滑动条的宽
    const sliderSize = slider.value?.offsetWidth;
    newPercent = ((clientX - sliderOffsetLeft) / (sliderSize as number)) * 100;
  }

  // 触发事件
  emit("update:modelValue", Math.floor(newPercent));
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
  // padding: 5px 0;
  display: flex;
  align-items: center;

  &.is-vertical {
    position: relative;
    display: inline-flex;
    width: auto;
    height: 100%;
    flex: 0;

    .slider_runway {
      width: 6px;
      height: 100%;
      margin: 0 16px;
    }

    .slider_btn-wrapper {
      top: auto;
      left: -15px;
      transform: translateY(50%);
    }
  }
  .slider_runway {
    flex: 1;
    height: 6px;
    background-color: #e4e7ed;
    border-radius: 3px;
    position: relative;
    cursor: pointer;

    .slider_bar {
      // 根据位置动态设置宽度或高度
      width: 100%;
      height: 100%;
      background-color: #409eff;
      border-radius: 3px;
      position: absolute;
    }
  }
}

// 标记点包裹样式
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
