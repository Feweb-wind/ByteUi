import type { Component, PropType } from 'vue'
import { Clock, CircleClose } from '@element-plus/icons-vue'

export const timeSelectProps = {
  format: {
    type: String,
    default: 'HH:mm',
  },
  modelValue: String,
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
    values: ['large', 'default', 'small'],
    default: 'default',
  },
  placeholder: String,
  name: String,
  effect: {
    type: String as PropType<'light' | 'dark' | string>,
    default: 'light',
  },
  start: {
    type: String,
    default: '09:00',
  },
  end: {
    type: String,
    default: '18:00',
  },
  step: {
    type: String,
    default: '00:30',
  },
  minTime: String,
  maxTime: String,
  prefixIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: () => Clock,
  },
  clearIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: () => CircleClose,
  },
}
