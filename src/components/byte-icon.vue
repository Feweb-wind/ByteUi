<template>
  <i class="byte-icon" :style="style">
    <slot />
  </i>
</template>

<script lang="ts" setup>
import { computed, CSSProperties } from 'vue'

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
  height: 1em;
  width: 1em;
}
</style>
