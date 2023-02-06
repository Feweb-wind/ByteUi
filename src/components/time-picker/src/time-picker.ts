import type { Component, PropType } from 'vue'
import { Clock, CircleClose } from '@element-plus/icons-vue'

export type SingleOrRange<T> = T | [T, T]
export type DateModelType = number | string | Date
export type ModelValueType = SingleOrRange<DateModelType>

export const timePickerProps = {
  modelValue: {
    type: [Date, Array, String, Number] as PropType<ModelValueType>,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  editable: {
    type: Boolean,
    default: true,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    values: ['small', 'default', 'large'],
    default: 'default',
  },
  placeholder: String,
  startPlaceholder: String,
  endPlaceholder: String,
  isRange: {
    type: Boolean,
    default: false,
  },
  arrowControl: {
    type: Boolean,
    default: false,
  },
  popperClass: String,
  rangeSeparator: {
    type: String,
    default: '-',
  },
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
  defaultValue: [Date, Array] as PropType<SingleOrRange<Date>>,
  id: [String, Array] as PropType<SingleOrRange<string>>,
  name: String,
  prefixIcon: {
    type: [Object, String] as PropType<string | Component>,
    default: Clock,
  },
  clearIcon: {
    type: [Object, String] as PropType<string | Component>,
    default: CircleClose,
  },
  disabledHours: Function as PropType<() => number[]>,
  disabledMinutes: Function as PropType<(hour: number) => number[]>,
  disabledSeconds: Function as PropType<
    (hour: number, minute: number) => number[]
  >,
  teleported: { type: Boolean, default: true },
}
