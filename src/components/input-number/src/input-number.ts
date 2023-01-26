import { isNil, isNumber } from 'lodash-unified'

export const inputNumberProps = {
  id: {
    type: String,
    default: undefined,
  },
  step: {
    type: Number,
    default: 1,
  },
  stepStrictly: Boolean,
  max: {
    type: Number,
    default: Number.POSITIVE_INFINITY,
  },
  min: {
    type: Number,
    default: Number.NEGATIVE_INFINITY,
  },
  modelValue: Number,
  readonly: Boolean,
  disabled: Boolean,
  size: {
    type: String,
    default: 'default',
    values: ['small', 'default', 'large'],
  },
  controls: {
    type: Boolean,
    default: true,
  },
  controlsPosition: {
    type: String,
    default: '',
    values: ['', 'right'],
  },
  valueOnClear: {
    type: [String, Number],
    validator: (val: 'min' | 'max' | number | null) =>
      val === null || isNumber(val) || ['min', 'max'].includes(val),
    default: null,
  },
  name: String,
  label: String,
  placeholder: String,
  precision: {
    type: Number,
    validator: (val: number) =>
      val >= 0 && val === Number.parseInt(`${val}`, 10),
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
}

export const inputNumberEmits = {
  change: (cur: number | undefined, prev: number | undefined) => prev !== cur,
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  input: (val: number | null | undefined) => isNumber(val) || isNil(val),
  'update:modelValue': (val: number | undefined) => isNumber(val) || isNil(val),
}
