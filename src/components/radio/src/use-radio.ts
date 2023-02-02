import { computed, inject, ref } from "vue";
import { RadioProps, RadioEmits } from "./radio";
import type { SetupContext } from "vue";
import { UPDATE_MODEL_EVENT } from "@/constants";
import { radioGroupKey } from "@/tokens";
import { useDisabled, useSize } from "@/hooks";

export const useRadio = (
  props: { label: RadioProps["label"]; modelValue?: RadioProps["modelValue"] },
  emit?: SetupContext<RadioEmits>["emit"]
) => {
  const radioRef = ref<HTMLInputElement>();
  const radioGroup = inject(radioGroupKey, undefined);
  const isGroup = computed(() => !!radioGroup);

  const modelValue = computed<RadioProps["modelValue"]>({
    get() {
      return isGroup ? radioGroup?.modelValue : props.modelValue;
    },
    set(newVal) {
      if (isGroup.value) {
        radioGroup?.changeEvent(newVal);
      } else {
        emit && emit(UPDATE_MODEL_EVENT, newVal);
      }
      radioRef.value!.checked = props.modelValue === props.label;
    },
  });
  const focus = ref(false);
  const size = useSize(computed(() => radioGroup?.size));
  const disabled = useDisabled(computed(() => radioGroup?.disabled));

  return {
    modelValue,
    focus,
    radioGroup,
    radioRef,
    disabled,
    size,
  };
};
