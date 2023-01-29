<template>
  <div
    :class="[ns.b('drag'), ns.is('dragover'), dragover]"
    @drop.prevent="onDrop"
    @dragover.prevent="onDragover"
    @dragleave.prevent="dragover = false"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@byte-ui/hooks'
import { inject, ref } from 'vue'
import {
  uploadContextKey,
  uploadDragProps,
  uploadDragEmits,
} from './upload-drag'

const ns = useNamespace('upload')
const dragover = ref(false)
const { disabled } = defineProps(uploadDragProps)
const emit = defineEmits(uploadDragEmits)

const uploaderContext = inject(uploadContextKey)
if (!uploaderContext) {
  console.warn(
    'ElUploadDrag, usage: <el-upload><el-upload-dragger /></el-upload>'
  )
}

const onDrop = (e: DragEvent) => {
  if (disabled) return
  dragover.value = false
  const files = Array.from(e.dataTransfer!.files)
  const accept = uploaderContext!.accept.value
  if (!accept) {
    emit('file', files)
    return
  }
  const filesFiltered = files.filter(file => {
    const { type, name } = file
    const extension = name.includes('.') ? `.${name.split('.').pop()}` : ''
    const baseType = type.replace(/\/.*$/, '')
    return accept
      .split(',')
      .map(type => type.trim())
      .filter(type => type)
      .some(acceptedType => {
        if (acceptedType.startsWith('.')) {
          return extension === acceptedType
        }
        if (/\/\*$/.test(acceptedType)) {
          return baseType === acceptedType.replace(/\/\*$/, '')
        }
        if (/^[^/]+\/[^/]+$/.test(acceptedType)) {
          return type === acceptedType
        }
        return false
      })
  })
  emit('file', filesFiltered)
}
const onDragover = () => {
  if (!disabled) dragover.value = true
}
</script>
