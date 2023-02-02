import { computed, CSSProperties, SetupContext, ShallowRef } from "vue";
import type { SliderEmits, SliderProps } from "./slider";
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from './slider'

export const useSlide = (props: SliderProps, slider: ShallowRef<HTMLElement | undefined>, emit: SetupContext<SliderEmits>['emit']) => {


  // 蓝条样式
  const barStyle = computed(() => {
    return props.vertical
      ? {
        height: `${(100 * (props.modelValue - props.min)) / (props.max - props.min)}%`,
        bottom: '0%',
      }
      : {
        width: `${(100 * (props.modelValue - props.min)) / (props.max - props.min)}%`,
        left: '0%',
      }
  })
  // 滑轨样式
  const runwayStyle = computed(() => {
    return props.vertical ? { height: props.height } : {}
  })
  // 按钮样式
  const btnWrapStyle = computed(() => {
    return props.vertical
      ?
      { bottom: `${(100 * (props.modelValue - props.min)) / (props.max - props.min)}%` }
      :
      { left: `${(100 * (props.modelValue - props.min)) / (props.max - props.min)}%` }
  })

  // 根据拖拽事件来更新位置
  const updatePosByMouseEvent = (e: MouseEvent) => {
    // 先判断是否禁用
    if (props.disabled) {
      return;
    }
    // 记录划过轨道的百分比
    let newPercent = 0;

    if (props.vertical) {
      let clientY = (e as MouseEvent).clientY;
      console.log(111);

      const sliderOffsetBottom = slider.value!.getBoundingClientRect().bottom;
      const sliderOffsetTop = slider.value!.getBoundingClientRect().top;

      // 修正位置
      clientY = clientY < sliderOffsetTop ? sliderOffsetTop :
        (clientY > sliderOffsetBottom ? sliderOffsetBottom : clientY);

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
        (clientX > sliderOffsetRight ? sliderOffsetRight : clientX);

      // 获取滑动条的宽
      const sliderSize = slider.value?.offsetWidth;
      newPercent = ((clientX - sliderOffsetLeft) / (sliderSize as number)) * 100;
    }

    // 根据步长更新位置
    setPosition(newPercent)
  };

  // 依据拖拽事件计算得出的位置信息，修正位置
  const setPosition = (newPosition: number) => {
    if (newPosition === null || Number.isNaN(+newPosition)) return
    if (newPosition < 0) {
      newPosition = 0
    } else if (newPosition > 100) {
      newPosition = 100
    }

    const lengthPerStep = 100 / ((props.max - props.min) / props.step)
    const steps = Math.round(newPosition / lengthPerStep)

    let realPosition = steps * lengthPerStep * (props.max - props.min) * 0.01 + props.min;
    realPosition = Number.parseFloat(realPosition.toFixed(precision.value))

    if (realPosition !== props.modelValue) {
      // 触发事件
      emit(UPDATE_MODEL_EVENT, realPosition);
    }
  };

  // 根据输入事件更新位置
  const updateValByInput = (newValue: number) => {
    emit(UPDATE_MODEL_EVENT, newValue);
  }

  // 根据人为设置的范围精修有效数位
  const precision = computed(() => {
    const precisions = [props.min, props.max, props.step].map((item) => {
      const decimal = `${item}`.split('.')[1]
      return decimal ? decimal.length : 0
    })
    return Math.max.apply(null, precisions)
  });

  // 初始化时修正位置
  const resetPostion = () =>{
    if (props.modelValue < props.min) {
      emit(UPDATE_MODEL_EVENT, props.min);
    } else if(props.modelValue > props.max){
      emit(UPDATE_MODEL_EVENT, props.max);
    }
  };

  resetPostion();

  return {
    barStyle,
    runwayStyle,
    btnWrapStyle,
    updatePosByMouseEvent,
    updateValByInput
  }
}

// 间断点
export const useStops = (props: SliderProps,) => {
  /**
   * @description 返回间断点序列所占位置的百分比数组
   */
  const stops = computed(() => {
    if (props.step === 0) {
      Promise.reject('ByteSlider: step should not be 0.')
      return []
    }
    // 断点数量
    const stopCounts = (props.max - props.min) / props.step;
    // 每步长所占百分比
    const stepWidth = 100 * props.step / (props.max - props.min);

    // 获取各间断点位置数组
    // 序列生成器 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from#%E5%BA%8F%E5%88%97%E7%94%9F%E6%88%90%E5%99%A8_%E6%8C%87%E5%AE%9A%E8%8C%83%E5%9B%B4
    const result = Array.from(
      { length: stopCounts - 1 },
      (_, i) => (i + 1) * stepWidth
    )

    // 只显示未被覆盖的位置
    return result.filter(
      step => step > (100 * (props.modelValue - props.min)) / (props.max - props.min)
    )
  })


  const getStopStyle = (position: number): CSSProperties => {
    return props.vertical
      ? { bottom: `${position}%` }
      : { left: `${position}%` }
  }

  return {
    stops,
    getStopStyle,
  }
}