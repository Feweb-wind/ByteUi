<template>
  <i class="byte-icon" :style="style">
    <slot />
  </i>
</template>

<script lang="ts" setup>
import { computed, CSSProperties } from 'vue'

defineOptions({
  name: 'ByteIcon',
});

const props = defineProps<{
  size?: number | string
  color?: string
}>()

const style = computed<CSSProperties>(() => {
  const { size, color } = props
  if (!size && !color) return {}
  return {
    fontSize: size === 'undefined' ? undefined : addUnit(size!),
    '--color': color,
  }
})

function addUnit(size: number | string): string {
  return typeof size === 'string' ? size : size + 'px'
}
</script>

<style lang="less">
.byte-icon {
  --color: inherit;
  height: 1em;
  width: 1em;
  line-height: 1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  fill: currentColor;
  color: var(--color);
  font-size: inherit;
}
</style>
