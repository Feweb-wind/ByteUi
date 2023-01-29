import { NOOP } from '@vue/shared'
import { uploadBaseProps } from './upload'

import type { ExtractPropTypes, PropType } from 'vue'
import type {
  UploadFile,
  UploadHooks,
  UploadProgressEvent,
  UploadRawFile,
} from './upload'
import type UploadContent from './upload-content.vue'
import type { UploadHttpError } from './http'

export const uploadContentProps = {
  ...uploadBaseProps,

  beforeUpload: {
    type: Function as PropType<UploadHooks['beforeUpload']>,
    default: NOOP,
  },
  onRemove: {
    type: Function as PropType<
      (file: UploadFile | UploadRawFile, rawFile?: UploadRawFile) => void
    >,
    default: NOOP,
  },
  onStart: {
    type: Function as PropType<(rawFile: UploadRawFile) => void>,
    default: NOOP,
  },
  onSuccess: {
    type: Function as PropType<
      (response: any, rawFile: UploadRawFile) => unknown
    >,
    default: NOOP,
  },
  onProgress: {
    type: Function as PropType<
      (evt: UploadProgressEvent, rawFile: UploadRawFile) => void
    >,
    default: NOOP,
  },
  onError: {
    type: Function as PropType<
      (err: UploadHttpError, rawFile: UploadRawFile) => void
    >,
    default: NOOP,
  },
  onExceed: {
    type: Function as PropType<UploadHooks['onExceed']>,
    default: NOOP,
  },
}

export type UploadContentProps = ExtractPropTypes<typeof uploadContentProps>

export type UploadContentInstance = InstanceType<typeof UploadContent>
