import { NOOP } from '@vue/shared'
import { uploadListTypes } from './upload'
import type { ExtractPropTypes, PropType } from 'vue'
import type { UploadFile, UploadFiles, UploadHooks } from './upload'
import type UploadList from './upload-list.vue'

export const uploadListProps = {
  files: {
    type: Array as PropType<UploadFiles>,
    default: {},
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  handlePreview: {
    type: Function as PropType<UploadHooks['onPreview']>,
    default: NOOP,
  },
  listType: {
    type: String,
    values: uploadListTypes,
    default: 'text',
  },
}

export type UploadListProps = ExtractPropTypes<typeof uploadListProps>
export const uploadListEmits = {
  remove: (file: UploadFile) => !!file,
}
export type UploadListEmits = typeof uploadListEmits
export type UploadListInstance = InstanceType<typeof UploadList>
