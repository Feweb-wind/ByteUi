<template>
<div
  class="byte-select-dropdown"
  :style="{[isFitInputWidth ? 'width' : 'minWidth'] : minWidth}"
>
  <slot/>
</div>
</template>

<script lang="ts" setup>
import {inject, computed, ref, onMounted} from "vue";
import { useResizeObserver } from '@vueuse/core';
import {selectKey} from "@/components/select/src/token";

defineOptions({
  name: 'ByteSelectDropdown'
});

const select = inject(selectKey);

const isMultiple = computed(() => select.props.multiple);
const isFitInputWidth = computed(() => select.props.fitInputWidth);
const minWidth = ref<string>('');
function updateMinWidth() {
  minWidth.value = `${select.selectWrapper?.offsetWidth}px`;
}
onMounted(() => {
  // TODO: updatePopper
  // popper.value.update()
  updateMinWidth()
  // https://vueuse.org/core/useresizeobserver/
  // useResizeObserver  =>  Reports changes to the dimensions of an Element's content or the border-box
  useResizeObserver(select.selectWrapper, updateMinWidth)
})
</script>

<style lang="less" scoped>

</style>