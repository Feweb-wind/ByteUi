import { isArray } from 'lodash-unified'
import type { ComputedRef, InjectionKey } from 'vue'

export interface UploadContext {
  accept: ComputedRef<string>
}

export const uploadContextKey: InjectionKey<UploadContext> =
  Symbol('uploadContextKey')

export const uploadDragProps = {
  disabled: {
    type: Boolean,
    default: false,
  },
}

export const uploadDragEmits = {
  file: (file: File[]) => isArray(file),
}