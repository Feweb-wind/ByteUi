<template>
<li
  @mouseenter="hoverItem"
  @click.stop="selectOptionClick"
  class="byte-select-dropdown-item"
  :class="{'is-disabled': isDisabled, 'selected': itemSelected}"
>
  <slot>
    <span>{{currentLabel}}</span>
  </slot>
</li>
</template>

<script setup lang="ts">
import {computed, reactive, getCurrentInstance, onBeforeUnmount, nextTick} from "vue";
import {useOption} from "./useOption";
import {SelectOptionProxy} from "@/components/select/src/token";

defineOptions({
  name: 'ByteOption'
});

const props = defineProps({
  value: {
    required: true,
    type: [String, Number, Boolean, Object]
  },
  label: [String, Number],
  created: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const states = reactive({
  index: -1,
  groupDisabled: false,
  visible: true,
  hitState: false,
  hover: false,
});

// currentLabel  =>  当前选项的展示值
// itemSelected  =>  boolean  =>  是否被选中
// isDisabled    =>  boolean  =>  是否被禁用
// select        =>  select选择器
// hoverItem     =>  更新select的hoverIndex值
const { currentLabel, itemSelected, isDisabled, select, hoverItem } = useOption(props, states);

// getCurrentInstance()  =>  vue3的setup语法糖无法直接获取this，该方法用来获取组件实例vm
//   =>   只能在setup或生命周期钩子中使用
const vm = getCurrentInstance()!.proxy;

select?.onOptionCreate(vm as unknown as SelectOptionProxy);

onBeforeUnmount(() => {
  const key = (vm as unknown as SelectOptionProxy).value;
  const { selected } = select!;
  const selectedOptions = select?.props.multiple ? selected : [selected];
  // 用于判断当前option是否被选中
  const doesSelected = selectedOptions.some((item: SelectOptionProxy) => {
    return item.value === (vm as unknown as SelectOptionProxy).value
  });
  // if option is not selected, remove it from cache
  nextTick(() => {
    if (select?.cachedOptions.get(key) === vm && !doesSelected) {
      select.cachedOptions.delete(key)
    }
  });
  select?.onOptionDestroy(key, vm);
})

function selectOptionClick() {
  if (!props.disabled && states.groupDisabled !== true) {
    select!.handleOptionSelect(vm, true)
  }
}

</script>

<style lang="less" scoped>
.byte-select-dropdown-item {
  list-style: none;
  font-size: 14px;
  padding: 0 32px 0 20px;
  margin-top: 0;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: pointer;

  // 被选中的样式
  &.selected {
    color: #409eff;
    font-weight: 700;
  }

  // 禁用选项的样式
  &.is-disabled {
    color: #a8abb2;
    cursor: not-allowed;
  }

  // 鼠标经过效果
  &:hover {
    background-color: #f5f7fa;
  }
}
</style>