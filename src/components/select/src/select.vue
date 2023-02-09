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
    :effect="effect"
    :disabled="disabled"
    trigger="click"
    style="padding: 5px 0;"
  >
    <!-- 输入框 -->
    <template #default>
      <div
        class="select-trigger"
        @mouseenter="inputHovering = true"
        @mouseleave="inputHovering = false"
      >
        <div
          v-if="multiple"
          ref="tags"
          class="byte-select-tags"
          :style="selectTagsStyle"
        >
          <!--  有多个标签被选中，且多个标签会进行折叠  -->
          <span
            v-if="collapseTag && selected.length"
            class="byte-select-tags-wrapper"
            :class="{'has-prefix': prefixWidth && selected.length}"
          >
            <byte-tag
                :closable="!selectDisabled && !selected[0].isDisabled"
                :hit="selected[0].hitState"
                :size="collapseTagSize"
                disable-transitions
                @close="deleteTag($event, selected[0])"
            >
                <span class="byte-select-tags-text" :style="tagTextStyle">
                  {{ selected[0].currentLabel }}
                </span>
            </byte-tag>
          </span>

          <input
            v-if="filterable"
            v-model="query"
            ref="input"
            :disabled="selectDisabled"
            :autocomplete="autocomplete"
            :style="{
                marginLeft:
                  (prefixWidth && !selected.length) || tagInMultiLine
                    ? `${prefixWidth}px`
                    : '',
                flexGrow: 1,
                width: `${inputLength / (inputWidth - 32)}%`,
                maxWidth: `${inputWidth - 42}px`,
              }"
            @focus="handleFocus"
            @blur="handleBlur"
            @keyup="managePlaceholder"
            @keydown="resetInputState"
            @keydown.down.prevent="navigateOptions('next')"
            @keydown.up.prevent="navigateOptions('prev')"
            @keydown.esc="handleKeydownEscape"
            @keydown.enter.stop.prevent="selectOption"
            @keydown.delete="deletePrevTag"
            @keydown.tab="visible = false"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
            @input="debouncedQueryChange"
          />
        </div>
        <byte-input
            ref="reference"
            v-model="selectedLabel"
            type="text"
            :visible="dropMenuVisible"
            :placeholder="currentPlaceholder"
            :name="name"
            :autocomplete="autocomplete"
            :size="selectSize"
            :disabled="selectDisabled"
            :readonly="readonly"
            :validate-event="false"
            :class="{'is-focus': visible}"
            :tabindex="multiple && filterable ? -1 : undefined"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="debouncedOnInputChange"
            @paste="debouncedOnInputChange"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
            @keydown.down.stop.prevent="navigateOptions('next')"
            @keydown.up.stop.prevent="navigateOptions('prev')"
            @keydown.enter.stop.prevent="selectOption"
            @keydown.esc="handleKeydownEscape"
            @keydown.tab="visible = false"
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
      </div>
    </template>

    <!-- 下拉菜单内容 -->
    <template #content>
      <byte-select-menu style="padding: 0;">
        <byte-scrollbar
          v-show="options.size > 0 && !loading"
          ref="scrollbar"
          tag="ul"
          wrap-style="padding:0;margin:0;"
          view-style="padding:0;margin:0;"
        >
          <slot/>
        </byte-scrollbar>
        <!--  下拉选项为空  -->
        <template
          v-if="emptyText && (!allowCreate || loading || (allowCreate && options.size === 0))"
        >
          <slot v-if="$slots.empty" name="empty"/>
          <p v-else class="byte-select-dropdown-empty">
            {{emptyText}}
          </p>
        </template>

      </byte-select-menu>
    </template>
  </byte-tooltip>
</div>
</template>

<script lang="ts" setup>
import {computed, getCurrentInstance, nextTick, onMounted, provide, reactive, toRefs, unref} from "vue";
import {ByteIcon, ByteScrollbar, ByteTag, ByteTooltip} from "@byte-ui/components";
// @ts-ignore
import {selectProps} from "./select.ts";
import ByteInput from "../../byte-input.vue";
import ByteSelectMenu from "./select-dropdown.vue";
import {SelectContext, selectKey} from "./token";
import {useSelect, useSelectStates} from "./useSelect";
import {CHANGE_EVENT, UPDATE_MODEL_EVENT} from "@byte-ui/constants";
import {useResizeObserver} from "@vueuse/core";

defineOptions({
  name: 'ByteSelect'
});
const props = defineProps(selectProps);
const emits = defineEmits([
  'remove-tag',
  'clear',
  'visible-change',
  'focus',
  'blur',
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT
]);

const states = useSelectStates(props);
const ctx = getCurrentInstance()!.proxy;

const {
  inputWidth,
  selected,
  inputLength,
  filteredOptionsCount,
  visible,
  softFocus,
  selectedLabel,
  hoverIndex,
  query,
  inputHovering,
  currentPlaceholder,
  menuVisibleOnFocus,
  isOnComposition,
  isSilentBlur,
  options,
  cachedOptions,
  optionsCount,
  prefixWidth,
  tagInMultiLine,
} = toRefs(states);

const {
  optionsArray,
  selectSize,
  readonly,
  handleResize,
  collapseTagSize,
  debouncedOnInputChange,
  debouncedQueryChange,
  deletePrevTag,
  deleteTag,
  deleteSelected,
  handleOptionSelect,  // option被选中
  scrollToOption,
  setSelected,
  resetInputHeight,
  managePlaceholder,
  showClose,
  selectDisabled,
  iconComponent,
  iconReverse,
  showNewOption,
  emptyText,
  toggleLastOptionHitState,
  resetInputState,
  handleComposition,
  onOptionCreate,
  onOptionDestroy,
  handleMenuEnter,
  handleFocus,
  blur,
  handleBlur,
  handleClearClick,
  handleClose,
  handleKeydownEscape,
  toggleMenu,
  selectOption,
  getValueKey,
  navigateOptions,
  dropMenuVisible,

  reference,
  input,
  tooltipRef,
  tags,
  selectWrapper,
  scrollbar,
  queryChange,
  groupQueryChange,
  handleMouseEnter,
  handleMouseLeave,
} = useSelect(props, states, ctx);

const selectTagsStyle = computed(() => ({
  maxWidth: `${unref(inputWidth) - 32}px`,
  width: '100%',
}))

const tagTextStyle = computed(() => {
  const maxWidth =
      unref(inputWidth) > 123
          ? unref(inputWidth) - 123
          : unref(inputWidth) - 75
  return { maxWidth: `${maxWidth}px` }
});

provide(selectKey, reactive({
      props,
      options,
      optionsArray,
      cachedOptions,
      optionsCount,
      filteredOptionsCount,
      hoverIndex,
      handleOptionSelect,
      onOptionCreate,
      onOptionDestroy,
      selectWrapper,
      selected,
      setSelected,
      queryChange,
      groupQueryChange,
    }) as unknown as SelectContext);

onMounted(() => {
  states.cachedPlaceHolder = currentPlaceholder.value = props.placeholder || "Select";
  if (props.multiple && Array.isArray(props.modelValue) && props.modelValue.length > 0) {
    currentPlaceholder.value = '';
  }
  useResizeObserver(selectWrapper, handleResize);
  if (props.remote && props.multiple) {
    resetInputHeight();
  }
  nextTick(() => {
    const refEl = reference.value && reference.value.$el;
    if (!refEl) return ;
    inputWidth.value = refEl.getBoundingClientRect().width;
    if (ctx!.$slots.prefix) {
      // TODO:
      const prefix = refEl.querySelector(`prefix`)
      prefixWidth.value = Math.max(
          prefix.getBoundingClientRect().width + 5,
          30
      )
    }
  })
})
</script>

<style lang="less" scoped>
@import "./style.less";
</style>