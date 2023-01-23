import { computed, ComputedRef, inject, WritableComputedRef } from "vue";
import {
  radioProps,
  radioEmits,
  radioGroupProvide,
  radioValueTypes,
} from "./radio";
// 是否有group
const useRadioGroup = () => {
  const radioGroup = inject<radioGroupProvide>("RadioGroup", {});
  const isGroup = radioGroup.name == "IRadioGroup";
  return {
    isGroup,
    radioGroup,
  };
};
// 拿到radio的值
const useModel = (props: radioProps, emit: radioEmits) => {
  const { isGroup, radioGroup } = useRadioGroup();
  const store = computed(() =>
    radioGroup ? radioGroup.modelValue?.value : props.modelValue
  );
  const model = computed({
    get() {
      return isGroup ? store.value : props.modelValue;
    },
    set(val) {
      if (isGroup) {
        if (radioGroup.changeEvent) radioGroup.changeEvent(val);
        return;
      }
      emit("update:modelValue", val);
    },
  });
  return model;
};
// radio是否被check
const useRadioStatus = (
  props: radioProps,
  model: WritableComputedRef<radioValueTypes>
) => {
  const isChecked = computed(() => {
    const value = model.value;
    // todo...
    if (Array.isArray(value)) {
      if (props.label) return value.includes(props.label);
    } else {
      return value;
    }
  });
  return isChecked;
};
// radio的禁用
const useRadioDisabled = (
  model: WritableComputedRef<Array<string | number>>,
  isChecked: ComputedRef,
  props: radioProps
) => {
  const { isGroup, radioGroup } = useRadioGroup();
  let isLimitDisabled: ComputedRef;
  if (isGroup) {
    const { min = 0, max = model.value.length - 1 } = radioGroup;
    // 根据min，max的值决定是否要禁用当前radio
    isLimitDisabled = computed(() => {
      return (
        (model.value.length >= max && !isChecked.value) ||
        (model.value.length <= min && isChecked.value)
      );
    });
  }

  const isDisabled = computed(
    () => props.disabled || radioGroup?.disabled || isLimitDisabled?.value
  );
  return isDisabled;
};

const useEvent = (
  emit: radioEmits,
  model: WritableComputedRef<boolean | number | string>
) => {
  //change回调
  const handleChange = (e: Event) => {
    emit("change", model.value);
  };
  return handleChange;
};

//radio状态导出
export const useRadio = (props: radioProps, emit: radioEmits) => {
  let model = useModel(props, emit);
  let isChecked = useRadioStatus(props, model);
  let isDisabled = useRadioDisabled(model, isChecked, props);
  let handleChange = useEvent(emit, model);
  return {
    model,
    isChecked,
    isDisabled,
    handleChange,
  };
};
