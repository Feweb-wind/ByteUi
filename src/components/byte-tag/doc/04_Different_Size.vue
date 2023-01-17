<template>
  <p>Tag 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。</p>
  <p>使用 <code>size</code> 属性来设置额外尺寸, 可选值包括 <code>large</code>, <code>default</code> 或 <code>small</code></p>
  <div class="example-showcase">
    <byte-tag size="large">Large</byte-tag>
    <byte-tag>Default</byte-tag>
    <byte-tag size="small">Small</byte-tag>
  </div>
</template>

<script lang="ts" setup>
import ByteTag from "@/components/byte-tag/byte-tag.vue";
</script>

<style scoped>

</style>