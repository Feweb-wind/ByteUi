<template>
<div style="width: 100vw; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center">
  HomePage<br/>
  <byte-button :icon="Search" circle />
  <byte-button type="primary" :icon="Edit" circle />
  <byte-button type="success" :icon="Check" circle />
  <byte-button type="info" :icon="Message" circle />
  <byte-button type="warning" :icon="Star" circle />
  <byte-button type="danger" :icon="Delete" circle />
  <button disabled>dddd</button>

  <CodePreview comp-name="button" demo-name="01_basic">
    <button>aaa</button>
  </CodePreview>
</div>

</template>

<script setup>
import {ByteButton} from "@byte-ui/components";
import CodePreview from "./components/CodePreview/index.vue"
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue';
console.log(Check)
</script>

<style lang="less" scoped>


</style>