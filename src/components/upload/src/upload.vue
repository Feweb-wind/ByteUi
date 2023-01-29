<template>
  <div>
    <upload-list
      v-if="isPictureCard && showFileList"
      :disabled="disabled"
      :list-type="listType"
      :files="uploadFiles"
      :handle-preview="onPreview"
      @remove="props.onRemove"
    >
      <template v-if="$slots.file" #default="{ file }">
        <slot name="file" :file="file" />
      </template>
      <template #append>
        <upload-content ref="uploadRef" v-bind="uploadContentProps">
          <slot v-if="$slots.trigger" name="trigger" />
          <slot v-if="!$slots.trigger && $slots.default" />
        </upload-content>
      </template>
    </upload-list>

    <upload-content
      v-if="!isPictureCard || (isPictureCard && !showFileList)"
      ref="uploadRef"
      v-bind="uploadContentProps"
    >
      <slot v-if="$slots.trigger" name="trigger" />
      <slot v-if="!$slots.trigger && $slots.default" />
    </upload-content>

    <slot v-if="$slots.trigger" />
    <slot name="tip" />
    <upload-list
      v-if="!isPictureCard && showFileList"
      :disabled="disabled"
      :list-type="listType"
      :files="uploadFiles"
      :handle-preview="onPreview"
      @remove="props.onRemove"
    >
      <template v-if="$slots.file" #default="{ file }">
        <slot name="file" :file="file" />
      </template>
    </upload-list>
  </div>
</template>

<script lang="ts" setup>
import UploadContent from './upload-content.vue'
import uploadList from './upload-list.vue'
import { uploadProps } from './upload'
import { computed, shallowRef } from 'vue'
import { UploadContentProps, UploadContentInstance } from './upload-content'
import { useHandlers } from './use-handlers'

const props = defineProps(uploadProps)

const isPictureCard = computed(() => props.listType === 'picture-card')

// const uploadFiles = ref<UploadFiles>()

const uploadRef = shallowRef<UploadContentInstance>()
const {
  abort,
  submit,
  clearFiles,
  uploadFiles,
  handleStart,
  handleError,
  handleRemove,
  handleSuccess,
  handleProgress,
} = useHandlers(props, uploadRef)

const uploadContentProps = computed<UploadContentProps>(() => ({
  ...props,
  fileList: uploadFiles.value,
  onStart: handleStart,
  onProgress: handleProgress,
  onSuccess: handleSuccess,
  onError: handleError,
  onRemove: handleRemove,
}))
defineExpose({
  /** @description cancel upload request */
  abort,
  /** @description upload the file list manually */
  submit,
  /** @description clear the file list  */
  clearFiles,
  /** @description select the file manually */
  handleStart,
  /** @description remove the file manually */
  handleRemove,
})
</script>

<style lang="less">
.byte-upload {
  color: black;
}
</style>
