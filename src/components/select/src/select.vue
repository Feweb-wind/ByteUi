<template>
  <div v-click-outside class="byte-select">
    <input :disabled="disabled" :placeholder="placeholder"
           :value="selectVal"
           readonly
           type="text"
    >
    <transition name="fade">
      <div v-if="positionShow" class="byte-position-box">
        <li v-for="(item, index) in options"
            :key="'select-choice' + index + item.value"
            :class="{'item-disabled-li': item.disabled, 'item-active-li': activeIndex === index}"
            class="item-li"
            @click="changeOption(item, index)"
        >
          {{ item[filedLabel] }}
        </li>
      </div>
    </transition>
  </div>

</template>

<script lang="ts" setup>
import {defineProps, ref} from "vue";
defineOptions({
  name: 'ByteSelect'
});
const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  // 匹配不同类型的数据，组件传递字段名
  filedLabel: {
    type: String,
    default: 'label'
  },
  filedValue: {
    type: String,
    default: 'value'
  },
  placeholder: String,
  modelVal: String,
  placement: {
    type: String,
    default: "bottom"
  }
});

// positionShow: 是否显示下拉选项
const positionShow = ref<boolean>(false);
const activeIndex = ref<number>(-1);
const emit = defineEmits(['change', 'update:modelVal']);
const selectVal = ref<string|undefined>(props.modelVal);
// 组件指定默认选择
props.options?.forEach((item, index) => {
  if(item[props.filedValue] === props.modelVal) {
    activeIndex.value = index;
    selectVal.value = item[props.filedLabel];
  }
})

// v + 名称  =>  自定义指令
const vClickOutside = {
  beforeMount: function (el: HTMLBaseElement) {
    let handler = (e: MouseEvent) => {
      if (!props.disabled) {
        if (el.contains(e.target as HTMLBaseElement)
            && (e.target as HTMLBaseElement).className.indexOf('item-li') === -1) {
          positionShow.value = true;
        }
        else {
          if ((e.target as HTMLBaseElement).className.indexOf('item-disabled-li') === -1) {
            positionShow.value = false;
          }
        }
      }
    }
    document.addEventListener('click', handler);
  }
};

const changeOption = (item: Object, index: number) => {
  if (!item.disabled) {
    activeIndex.value = index;
    selectVal.value = item[props.filedLabel];
    positionShow.value = false;
    emit('update:modelVal', item[props.filedLabel]);
    emit('change', item);
  }
}
</script>

<style lang="less" scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.byte-select {
  display: inline-block;
  height: 40px;
  position: relative;
  min-width: 250px;

  input {
    border: 1px solid @border;
    padding: 8px 10px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
  }

  .byte-position-box {
    width: 100%;
    height: auto;
    overflow: hidden;
    position: absolute;
    top: 42px;
    border: 1px solid @border;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 99;
    background: #ffffff;

    li {
      list-style: none;
      line-height: 40px;
      padding: 0 10px;
      box-sizing: border-box;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background: #f0f0f0;
      }
    }

    li.item-disabled-li {
      cursor: no-drop;
      color: #808080;
      background: #f0f0f0;
    }

    .item-active-li {
      color: @primary;
      font-weight: bold;
    }
  }
}
</style>