<template>
  <div :class="sliderClass" :disabled="disabled">
    <div class="slider_runway" :value="modelValue">
      <!-- 圆点左边 -->
      <div class="slider_bar" :style="{ width: activePosition + '%' }"></div>
      <div
        v-draggable
        class="slider_btn-wrapper"
        :style="{ left: activePosition + '%' }"
        :disabled="disabled"
        :step="step"
        :min="min"
        :max="max"
      >
        <div class="slider_btn"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

interface ElType extends HTMLElement {
  parentNode: any;
}

// 设置动态位置参数
let activePosition = ref<number>(0);

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

// 实现拖拽自定义指令
/**
 * 需求：实现拖拽
 *
 * 思路：
 *  1、需设置子绝父相的定位
 *  2、鼠标按下，记录当前的位置
 *  3、鼠标移动，记录鼠标横向的距离变化
 *  4、鼠标松开，完成一次拖拽
 */
const vDraggable = {
  beforeMount(el: ElType) {
    // 先判断是否禁用
    if (!(el.getAttribute("disabled") == "false")) {
      return;
    }
    // 获取步长
    let step = Number.parseInt(el.getAttribute("step") as string);

    el.onmousedown = function (e) {
      el.style.cursor = "grabbing";
      // 记录按下鼠标时的坐标位置
      let disX = e.pageX - el.offsetLeft;
      document.onmousemove = function (e) {
        // 计算鼠标的位移量 + 盒子原来的坐标 == 盒子的新位置
        let x = e.pageX - disX;
        // 计算最大坐标位置
        // 最大坐标位置 == 父盒子的宽高 - 子盒子本身的宽高
        let maxX = el.parentNode.offsetWidth;
        // 判断是否超出父元素边界，修正位移
        x = x < 0 ? 0 : x > maxX ? maxX : x;

        // 每步长step 转为像素
        let stepToPx = maxX / (100 / step);

        // 根据步长跟随移动，计算走了几个步长，可以使用hook优化，只返回坐标
        let moveX = Math.round(x / stepToPx);

        // 设置自定义元素方便数据绑定传值
        let temp = moveX * step;
        // 触发自定义事件
        emit("update:modelValue", temp);
        // 改变蓝条长度，和圆点位置
        activePosition.value = temp;

        // 计算实际的位移
        // let move = moveX * stepToPx;
        // 修正位移
        // move = move < 0 ? 0 : move > maxX ? maxX : move;
        // el.style.left = move + "px";
      };
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
