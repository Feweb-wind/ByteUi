import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "@/constants";
import { useSizeProp } from "@/hooks";
import { buildProps, isNumber, isString, isBoolean } from "@/utils";
import type { ExtractPropTypes } from "vue";

export const radioProps = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  label: {
    type: [String, Number, Boolean],
    default: "",
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  border: Boolean,
} as const);

export const radioEmits = {
  [UPDATE_MODEL_EVENT]: (val: string | number | boolean) =>
    isString(val) || isNumber(val) || isBoolean(val),
  [CHANGE_EVENT]: (val: string | number | boolean) =>
    isString(val) || isNumber(val) || isBoolean(val),
};

export type RadioProps = ExtractPropTypes<typeof radioProps>;
export type RadioEmits = typeof radioEmits;
