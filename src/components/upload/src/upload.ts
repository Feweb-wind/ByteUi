import { NOOP } from '@vue/shared'
import { AxiosProgressEvent } from 'axios'
import { PropType, ExtractPropTypes } from 'vue'
import { UploadHttpError, axiosUpload } from './http'

export const uploadListTypes = ['text', 'picture', 'picture-card'] as const

let fileId = 1
export const genFileId = () => Date.now() + fileId++

export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'
export interface UploadProgressEvent extends AxiosProgressEvent {
  percent: number
}

export interface UploadRequestOptions {
  action: string
  method: string
  data: Record<string, string | Blob | [string | Blob, string]>
  filename: string
  file: File
  headers: Headers | Record<string, string | number | null | undefined>
  onError: (evt: UploadHttpError) => void
  onProgress: (evt: UploadProgressEvent) => void
  onSuccess: (response: any) => void
  withCredentials: boolean
}
export interface UploadFile {
  name: string
  percentage?: number
  status: UploadStatus
  size?: number
  response?: unknown
  uid: number
  url?: string
  raw?: UploadRawFile
}
export type UploadUserFile = Omit<UploadFile, 'status' | 'uid'> &
  Partial<Pick<UploadFile, 'status' | 'uid'>>

export type UploadFiles = UploadFile[]
export interface UploadRawFile extends File {
  uid: number
}
export type UploadRequestHandler = (
  options: UploadRequestOptions
) => XMLHttpRequest | Promise<unknown>

export const uploadBaseProps = {
  action: {
    type: String,
    default: '#',
  },
  headers: {
    type: Object as Headers | Record<string, any>,
  },
  method: {
    type: String,
    default: 'post',
  },
  data: {
    type: Object as Record<string, any>,
    default: {},
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: 'file',
  },
  drag: {
    type: Boolean,
    default: false,
  },
  withCredentials: Boolean,
  showFileList: {
    type: Boolean,
    default: true,
  },
  accept: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'select',
  },
  fileList: {
    type: Array as PropType<UploadUserFile[]>,
    default: [],
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  listType: {
    type: String,
    values: uploadListTypes,
    default: 'text',
  },
  httpRequest: {
    type: Function as PropType<UploadRequestHandler>,
    default: axiosUpload,
  },
  disabled: Boolean,
  limit: Number,
}

export interface UploadHooks {
  beforeUpload: (
    rawFile: UploadRawFile
  ) => Promise<void | undefined | null | boolean | File | Blob> | boolean
  beforeRemove: (
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => Promise<boolean> | boolean
  onRemove: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onChange: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onPreview: (uploadFile: UploadFile) => void
  onSuccess: (
    response: any,
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => void
  onProgress: (
    evt: UploadProgressEvent,
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => void
  onError: (
    error: Error,
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => void
  onExceed: (files: File[], uploadFiles: UploadUserFile[]) => void
}

export const uploadProps = {
  ...uploadBaseProps,
  beforeUpload: {
    type: Function as PropType<UploadHooks['beforeUpload']>,
    default: NOOP,
  },
  beforeRemove: {
    type: Function as PropType<UploadHooks['beforeRemove']>,
  },
  onRemove: {
    type: Function as PropType<UploadHooks['onRemove']>,
    default: NOOP,
  },
  onChange: {
    type: Function as PropType<UploadHooks['onChange']>,
    default: NOOP,
  },
  onPreview: {
    type: Function as PropType<UploadHooks['onPreview']>,
    default: NOOP,
  },
  onSuccess: {
    type: Function as PropType<UploadHooks['onSuccess']>,
    default: NOOP,
  },
  onProgress: {
    type: Function as PropType<UploadHooks['onProgress']>,
    default: NOOP,
  },
  onError: {
    type: Function as PropType<UploadHooks['onError']>,
    default: NOOP,
  },
  onExceed: {
    type: Function as PropType<UploadHooks['onExceed']>,
    default: NOOP,
  },
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
