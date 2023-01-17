<template>
  <p>由 <code>type</code> 属性来选择 tag 的类型。 也可以通过 <code>color</code> 属性来自定义背景色。</p>
  <div class="example-showcase">
    <byte-tag>Tag 1</byte-tag>
    <byte-tag type="success">Tag 2</byte-tag>
    <byte-tag type="info">Tag 3</byte-tag>
    <byte-tag type="warning">Tag 4</byte-tag>
    <byte-tag type="danger">Tag 5</byte-tag>
  </div>
</template>

<script lang="ts" setup>
import ByteTag from "@/components/byte-tag/byte-tag.vue"</script>

<style scoped>


</style>