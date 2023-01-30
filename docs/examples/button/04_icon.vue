<template>
  <div>
    <byte-button type="primary" :icon="Edit" />
    <byte-button type="primary" :icon="Share" />
    <byte-button type="primary" :icon="Delete" />
    <byte-button type="primary" :icon="Search">Search</byte-button>
    <byte-button type="primary">
      Upload<byte-icon class="byte-icon-right"><Upload /></byte-icon>
    </byte-button>
  </div>
</template>
<script setup lang="ts">
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
</script>
<style lang="less" scoped>
div {
  width: 60%;
  display: flex;
  justify-content: space-around;
}
.byte-icon-right {
  margin-left: 5px;
}
</style>