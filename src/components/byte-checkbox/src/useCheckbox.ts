import { computed, ComputedRef, inject, WritableComputedRef } from "vue";
import {
  checkboxProps,
  checkboxEmits,
  checkboxGroupProvide,
  checkboxValueTypes,
} from "./checkbox";
//判断是否有checkbox-group
const useCheckboxGroup = () => {
  const checkboxGroup = inject<checkboxGroupProvide>("CheckboxGroup", {});
  const isGroup = checkboxGroup.name == "ICheckboxGroup";
  return {
    isGroup,
    checkboxGroup,
  };
};
/**
 * 获取chebox的值，它的取值取决于用户的定制，
 * 一般有true/false，true-value/false-value，label的值
 * @param props
 * @param emit
 * @returns
 */
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
/**
 * checkbox是否选中
 * @param props
 * @param model
 * @returns boolean
 */
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
/**
 * checkbox是否被禁用
 * @param model
 * @param isChecked
 * @param props
 * @returns boolean
 */
const useCheckboxDisabled = (
  model: WritableComputedRef<Array<string | number>>,
  isChecked: ComputedRef,
  props: checkboxProps
) => {
  const { isGroup, checkboxGroup } = useCheckboxGroup();
  let isLimitDisabled: ComputedRef;
  if (isGroup) {
    const { min = 0, max = model.value.length - 1 } = checkboxGroup;
    // 根据min，max的值决定是否要禁用当前checkbox
    isLimitDisabled = computed(() => {
      return (
        (model.value.length >= max && !isChecked.value) ||
        (model.value.length <= min && isChecked.value)
      );
    });
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
  //change回调事件，参数为当前checkbox的model
  const handleChange = (e: Event) => {
    // const target = e.target as HTMLInputElement;
    emit("change", model.value);
  };
  return handleChange;
};

//checkbox需要状态导出函数
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
