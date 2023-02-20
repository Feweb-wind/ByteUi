<template>
  <byte-upload
    ref="upload"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
  >
    <template #trigger>
      <byte-button type="primary">select file</byte-button>
    </template>
    <byte-button class="ml-3" type="success" @click="submitUpload">
      upload to server
    </byte-button>
    <template #tip>
      <div class="byte-upload__tip text-red">
        limit 1 file, new file will cover the old file
      </div>
    </template>
  </byte-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { genFileId } from 'byte-ui'
import type { UploadInstance, UploadProps, UploadRawFile } from 'byte-ui'

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  upload.value!.submit()
}
</script>