import { computed, ComputedRef, inject, WritableComputedRef } from "vue";
import {
  checkboxProps,
  checkboxEmits,
  checkboxGroupProvide,
  checkboxValueTypes,
} from "./checkbox";
const useCheckboxGroup = () => {
  const checkboxGroup = inject<checkboxGroupProvide>("CheckboxGroup", {});
  const isGroup = checkboxGroup.name == "ICheckboxGroup";
  return {
    isGroup,
    checkboxGroup,
  };
};

const useModel = (props: checkboxProps, emit: checkboxEmits) => {
  const { isGroup, checkboxGroup } = useCheckboxGroup();
  const store = computed(() =>
    checkboxGroup ? checkboxGroup.modelValue?.value : props.modelValue
  );
  const model = computed({
    get() {
      return isGroup ? store.value : props.modelValue;
    },
    set(val) {
      if (isGroup) {
        if (checkboxGroup.changeEvent) checkboxGroup.changeEvent(val);
        return;
      }
      emit("update:modelValue", val);
    },
  });
  return model;
};

const useCheckboxStatus = (
  props: checkboxProps,
  model: WritableComputedRef<checkboxValueTypes>
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

const useCheckboxDisabled = (
  model: WritableComputedRef<Array<string | number>>,
  isChecked: ComputedRef,
  props: checkboxProps
) => {
  const { isGroup, checkboxGroup } = useCheckboxGroup();
  let isLimitDisabled: ComputedRef;
  if (isGroup) {
    const { min = 0, max = model.value.length - 1 } = checkboxGroup;
    isLimitDisabled = computed(() => {
      return (
        (model.value.length >= max && !isChecked.value) ||
        (model.value.length <= min && isChecked.value)
      );
    });
    console.log(min, max, isLimitDisabled.value);
  }

  const isDisabled = computed(
    () => props.disabled || checkboxGroup?.disabled || isLimitDisabled?.value
  );
  return isDisabled;
};

const useEvent = (
  emit: checkboxEmits,
  model: WritableComputedRef<boolean | number | string>
) => {
  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    emit("change", model.value);
  };
  return handleChange;
};
export const useCheckbox = (props: checkboxProps, emit: checkboxEmits) => {
  let model = useModel(props, emit);
  let isChecked = useCheckboxStatus(props, model);
  let isDisabled = useCheckboxDisabled(model, isChecked, props);
  let handleChange = useEvent(emit, model);
  return {
    model,
    isChecked,
    isDisabled,
    handleChange,
  };
};
