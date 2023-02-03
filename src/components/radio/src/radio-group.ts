import { ExtractPropTypes } from "vue";
import { useSizeProp } from "@byte-ui/hooks";
import { buildProps } from "@byte-ui/utils";
import { radioEmits } from "./radio";

export const radioGroupProps = buildProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: "",
  },
  size: useSizeProp,
  disabled: Boolean,
  textColor: String,
  fill: {
    type: String,
    default: "",
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    default: undefined,
  },
} as const);

export const radioGroupEmits = radioEmits;
export type RadioGroupEmits = typeof radioGroupEmits;

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;
