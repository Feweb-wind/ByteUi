<template>
  <div class="byte-upload">
    <slot name="tip" />
  </div>
</template>

<script lang="ts" setup>
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
