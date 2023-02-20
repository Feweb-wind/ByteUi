<template>
  <byte-upload
    ref="uploadRef"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :auto-upload="false"
  >
    <template #trigger>
      <byte-button type="primary">select file</byte-button>
    </template>

    <byte-button class="ml-3" type="success" @click="submitUpload">
      upload to server
    </byte-button>

    <template #tip>
      <div class="byte-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </byte-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadInstance } from 'byte-ui'

const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
  uploadRef.value!.submit()
}
</script>