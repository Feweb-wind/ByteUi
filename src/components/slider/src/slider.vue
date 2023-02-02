<template>
  <div :class="sliderClass">
    <!-- 滑轨 -->
    <div
      ref="slider"
      :class="runwayClass"
      :style="runwayStyle"
      @mousedown="updatePosByMouseEvent"
    >
      <!-- 已划过的滑轨 -->
      <div class="slider_bar" :style="barStyle"></div>
      <!-- 标记圆点 -->
      <slider-button
        :model-value="modelValue"
        :vertical="vertical"
        :disabled="disabled"
        :showTooltip="showTooltip"
        :placement="placement"
        @update="updatePosByMouseEvent"
      />
      <!-- 显示断点 -->
      <div v-if="showStops">
        <div
          v-for="item in stops"
          class="slider_stop"
          :style="getStopStyle(item)"
        />
      </div>
    </div>
    <!-- 携带输入框 -->
    <byte-input-number
      v-if="showInput"
      :max="max"
      :min="min"
      :step="step"
      :modelValue="modelValue"
      :size="size"
      @update:model-value="updateValByInput"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, shallowRef } from "vue";
import { useSlide, useStops } from "./use-slide";
import SliderButton from "./slider-button.vue";
import { SliderEmits, sliderProps } from "./slider";
import { ByteInputNumber } from "@/components/input-number/index";

defineOptions({
  name: "ByteSlider",
});

const props = defineProps(sliderProps);
const slider = shallowRef<HTMLElement>();
const emit = defineEmits(SliderEmits);

const sliderClass = computed(() => {
  return [
    "byte-slider",
    {
      "byte-slider-disable": props.disabled,
    },
    {
      "is-vertical": props.vertical,
    },
  ];
});

const runwayClass = computed(() => {
  return [
    "slider_runway",
    {
      "show-input": props.showInput,
    },
  ];
});

const { barStyle, runwayStyle, btnWrapStyle, updatePosByMouseEvent, updateValByInput } =
  useSlide(props, slider, emit);

// 间断点
const { stops, getStopStyle } = useStops(props);

//
provide("SliderKey", btnWrapStyle);
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

    // 间断点样式
    .slider_stop {
      position: absolute;
      height: 6px;
      width: 6px;
      border-radius: 100%;
      background-color: white;
      transform: translate(-50%);
    }

    // 输入框样式
    &.show-input {
      margin-right: 30px;
      width: auto;
    }
  }
}

// 控制禁用样式
.byte-slider-disable {
  .slider_runway {
    cursor: default;
  }
}
</style>
