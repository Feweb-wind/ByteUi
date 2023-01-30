import { ComputedRef } from "vue";

export type checkboxValueTypes =
  | number
  | string
  | boolean
  | Array<string | boolean | number | object>;

export interface checkboxProps {
  modelValue?: number | string | boolean;
  label?: string | boolean | number | object;
  disabled?: boolean;
  border?: boolean;
  trueLabel?: number | string;
  falseLabel?: number | string;
  id?: string;
  name?: string;
  size?: "large" | "small" | "default";
  checked?: boolean;
  indeterminate?: boolean;
  isButton?: boolean;
}

export interface checkboxEmits {
  (e: "update:modelValue", value: string | number | boolean): void;
  (e: "change", val: string | number | boolean): void;
}

export interface checkboxGroupProvide {
  modelValue?: ComputedRef;
  changeEvent?: (val: unknown) => void;
  name?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
}
