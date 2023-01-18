<template>
  <div class="byte-upload"></div>
</template>

<script lang="ts" setup>
import { NOOP } from '@vue/shared'
import { UploadProps } from './index'

const props = withDefaults(defineProps<UploadProps>(), {
  action: '#',
  method: 'post',
  multiple: false,
  name: 'file',
  withCredentials: false,
  showFileList: false,
  drag: false,
  listType: 'text',
  autoUpload: true,
  disabled: false,
  onRemove: NOOP,
  onChange: NOOP,
  onPreview: NOOP,
  onSuccess: NOOP,
  onProgress: NOOP,
  onError: NOOP,
  onExceed: NOOP,
})
</script>

<style lang="less">
.byte-upload {
  color: black;
}
</style>
