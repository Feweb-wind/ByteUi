import { placements } from '@popperjs/core';
import { isNumber } from '@vueuse/core';
import { ExtractPropTypes } from 'vue';

export const UPDATE_MODEL_EVENT = 'update:modelValue'
export const INPUT_EVENT = 'input'
export const CHANGE_EVENT = 'change'

export const sliderProps = {
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
  showInput: {
    type: Boolean,
    default: false,
  },
  // showInputControls: {
  //   type: Boolean,
  //   default: true,
  // },
  size: {
    type: String,
    default: 'default',
    values: ['small', 'default', 'large'],
  },
  // inputSize: useSizeProp,
  showStops: Boolean,
  showTooltip: {
    type: Boolean,
    default: true,
  },
  // formatTooltip: {
  //   type: definePropType<(val: number) => number | string>(Function),
  //   default: undefined,
  // },
  // tooltipClass: {
  //   type: String,
  //   default: undefined,
  // },
  placement: {
    type: String,
    values: placements,
    default: 'top',
  },
};

export type SliderProps = ExtractPropTypes<typeof sliderProps>

// 设置类型校验
const isValidValue = (value: number) => isNumber(value)
export const SliderEmits = {
  [UPDATE_MODEL_EVENT]: isValidValue,
  [INPUT_EVENT]: isValidValue,
  [CHANGE_EVENT]: isValidValue,
};

export type SliderEmits = typeof SliderEmits;
