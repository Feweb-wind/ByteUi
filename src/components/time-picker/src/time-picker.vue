<template>
  <byte-popover trigger="focus" effect="light" style="bottom: 6px">
    <template #reference>
      <byte-input
        ref="input"
        :prefix-icon="Clock"
        @focus="focus"
        @blur="blur"
      />
    </template>
    <time-panel />
  </byte-popover>
</template>

<script lang="ts" setup>
import { ByteInput, BytePopover } from '@byte-ui/components'
import TimePanel from './time-panel.vue'
import { Clock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { timePickerProps } from './time-picker'

const props = defineProps(timePickerProps)

const input = ref<typeof ByteInput>()
const focus = (): void => {
  console.log(111)
}
const blur = (): void => {
  console.log(222)
}
defineExpose({
  blur,
  focus,
})
</script>

<style lang="less">
.scrollbar-demo-item {
  width: 40px;
}
.byte-tooltip {
  padding: 0 !important;
  bottom: 6px;
}
</style>
