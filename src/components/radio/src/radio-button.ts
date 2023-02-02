import { ExtractPropTypes } from "vue";
import { useSizeProp } from "@/hooks";
import { buildProps } from "@/utils";
import { UPDATE_MODEL_EVENT } from "@/constants";

export const radioButtonProps = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  label: {
    type: [String, Number, Boolean],
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
});

export type RadioButtonProps = ExtractPropTypes<typeof radioButtonProps>;


