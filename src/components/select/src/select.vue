<template>
<div
  ref="selectWrapper"
  class="byte-select-wrapper"
  @mouseenter="handleMouseEnter"
  @mouseleave="handleMouseLeave"
  @click.stop="toggleMenu"
>
  <byte-tooltip
    ref="tooltipRef"
    :placement="placement"
    effect="light"
    trigger="click"
    style="padding: 0;"
  >
    <!-- 输入框 -->
    <template #default>
      <byte-input
          ref="reference"
          type="text"
          :size="size"
          :disabled="disabled"
          :placeholder="placeholder"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="debouncedOnInputChange"
          @paste="debouncedOnInputChange"
      >
        <!-- 输入框前缀图标 -->
        <template v-if="$slots.prefix" #prefix>
          <div
              style="
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
          >
            <slot name="prefix" />
          </div>
        </template>

        <!-- 输入框后缀图标 -->
        <template #suffix>
          <byte-icon
              v-if="iconComponent && !showClose"
          >
            <component :is="iconComponent" />
          </byte-icon>
          <byte-icon
              v-if="showClose && clearIcon"
              @click="handleClearClick"
          >
            <component :is="clearIcon" />
          </byte-icon>
        </template>
      </byte-input>
    </template>

    <!-- 下拉菜单内容 -->
    <template #content>
      <byte-select-menu style="padding: 0;">
        <slot/>
      </byte-select-menu>
    </template>
  </byte-tooltip>
</div>
</template>

<script lang="ts" setup>
import {ref, reactive, provide} from "vue";
import {ByteTooltip, ByteIcon} from "@byte-ui/components";
// @ts-ignore
import {selectProps} from "./select.ts";
import ByteInput from "../../byte-input.vue";
import ByteSelectMenu from "./select-dropdown.vue";
import {selectKey} from "./token";
import {useSelectStates} from "./useSelect";

defineOptions({
  name: 'ByteSelect'
});
const props = defineProps(selectProps);
const selectWrapper = ref<HTMLElement>();
const tooltipRef = ref<HTMLElement>();
const reference = ref<HTMLElement>();

const states = useSelectStates(props);
provide(selectKey, reactive({
  props,
}))
</script>

<style lang="less" scoped>
@import "./style.less";
</style>