<template>
<li
  @mouseenter="hoverItem"
  @click.stop="selectOptionClick"
  class="byte-select-dropdown-item"
  :class="{'is-disabled': isDisabled}"
>
  <slot>
    <span>{{value}}</span>
  </slot>
</li>
</template>

<script setup lang="ts">
import {computed, reactive, getCurrentInstance} from "vue";
import {useOption} from "./useOption";

defineOptions({
  name: 'ByteOption'
});
// getCurrentInstance()  =>  vue3的setup语法糖无法直接获取this，该方法用来获取组件实例vm
//   =>   只能在setup或生命周期钩子中使用
const vm = getCurrentInstance()!.proxy;
const props = defineProps({
  value: {
    required: true,
    type: [String, Number, Boolean, Object]
  },
  label: [String, Number],
  created: Boolean,
  disabled: {
    type: Boolean,
    default: false,
  }
});

const states = reactive({
  index: -1,
  groupDisabled: false,
  visible: true,
  hitState: false,
  hover: false,
});

const { currentLabel, itemSelected, isDisabled, select, hoverItem } = useOption(props, states)

const disabledClass = computed(() => {
  if (props.disabled) {
    return "is-disabled"
  }
});

function selectOptionClick() {
  if (props.disabled !== true && states.groupDisabled !== true) {
    select!.handleOptionSelect(vm, true);
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

  &.selected {
    color: #409eff;
    font-weight: 700;
  }

  &.is-disabled {
    color: #a8abb2;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #f5f7fa;
  }
}
</style>