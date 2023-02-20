<template>
  <div :class="[rangeNs.b(), editorNs.b(), inputNs.e('wrapper')]">
    <byte-icon :class="rangeNs.e('icon')">
      <component :is="prefixIcon" />
    </byte-icon>
    <date-editor
      v-model="startTime"
      is-range
      :name="name"
      :format="format"
      :mode="mode?.replace('range&', '')"
      :placeholder="startPlaceholder"
    />
    <span :class="rangeNs.e('range-eparator')">{{ rangeSeparator }}</span>
    <date-editor
      v-model="endTime"
      is-range
      :name="name"
      :format="format"
      :mode="mode?.replace('range&', '')"
      :placeholder="endPlaceholder"
    />
    <byte-icon v-if="clearable" :class="rangeNs.e('icon')">
      <component :is="clearIcon" />
    </byte-icon>
  </div>
</template>

<script lang="ts" setup>
import { ByteIcon } from '@/byte-ui'
import { useNamespace } from '@/hooks'
import { timePickerProps } from './time-picker'
import DateEditor from './date-editor.vue'
import { computed, ref } from 'vue'
import type { PropType } from 'vue'

const rangeNs = useNamespace('range')
const editorNs = useNamespace('date-editor')
const inputNs = useNamespace('input')
const props = defineProps({
  ...timePickerProps,
  modelValue: Object as PropType<[Date, Date]>,
  mode: String,
})
const emits = defineEmits(['update:modelValue'])

const startTime = computed({
  get: () => props.modelValue?.[0],
  set: val => emits('update:modelValue', [val, props.modelValue?.[1]]),
})

const endTime = computed({
  get: () => props.modelValue?.[1],
  set: val => emits('update:modelValue', [props.modelValue?.[0], val]),
})

const focused = ref(false)
</script>

<style lang="less">
.byte-range {
  display: inline-flex;
  align-items: center;
  padding: 0 10px;
  width: 350px;
  height: 32px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px #dcdfe6 inset;

  .byte-range__icon {
    height: inherit;
    font-size: 14px;
    color: #a8abb2;
  }
  .byte-range-input {
    border: none;
    outline: none;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    margin: 0;
    padding: 0;
    width: 39%;
    text-align: center;
  }

  .byte-range__range-eparator {
    flex: 1;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 5px;
    margin: 0;
    font-size: 14px;
    word-break: keep-all;
    color: var(--el-text-color-primary);
  }
}
</style>
