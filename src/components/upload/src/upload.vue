<template>
  <div>
    <slot name="tip" />
    <upload-content></upload-content>
  </div>
</template>

<script lang="ts" setup>
import UploadContent from "./upload-content.vue";
import {
  uploadProps,
} from './upload'

const props = defineProps(uploadProps)

</script>

<style lang="less">
.byte-upload {
  color: black;
}
</style>
