import { NOOP } from '@vue/shared'

export class UploadAjaxError extends Error {
  name = 'UploadAjaxError'
  status: number
  method: string
  url: string

  constructor(message: string, status: number, method: string, url: string) {
    super(message)
    this.status = status
    this.method = method
    this.url = url
  }
}
export const uploadListTypes = ['text', 'picture', 'picture-card'] as const

let fileId = 1
export const genFileId = () => Date.now() + fileId++

export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'
export interface UploadProgressEvent extends ProgressEvent {
  percent: number
}

export interface UploadRequestOptions {
  action: string
  method: string
  data: Record<string, string | Blob | [string | Blob, string]>
  filename: string
  file: File
  headers: Headers | Record<string, string | number | null | undefined>
  onError: (evt: UploadAjaxError) => void
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

export interface UploadBaseProps {
  action: string
  headers?: Headers | Record<string, any>
  method?: string
  multiple?: boolean
  data?: Record<string, any>
  name?: string
  withCredentials?: boolean
  showFileList?: boolean
  drag?: boolean
  accept?: string
  fileList?: UploadUserFile[]
  listType: 'text' | 'picture' | 'picture-card'
  autoUpload: boolean
  httpRequest: (
    options: UploadRequestOptions
  ) => XMLHttpRequest | Promise<unknown>
  disabled: boolean
  limit: number
}

export interface UploadHooks {
  beforeUpload?: (
    rawFile: UploadRawFile
  ) => Promise<void | undefined | null | boolean | File | Blob> | boolean
  beforeRemove?: (
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => Promise<boolean> | boolean
  onRemove?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onChange?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onPreview?: (uploadFile: UploadFile) => void
  onSuccess?: (
    response: any,
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => void
  onProgress?: (
    evt: UploadProgressEvent,
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => void
  onError?: (
    error: Error,
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => void
  onExceed?: (files: File[], uploadFiles: UploadUserFile[]) => void
}

export interface UploadProps extends UploadBaseProps, UploadHooks {}

export class UploadPropsDefault {
  action = '#'
  method = 'post'
  multiple = false
  name = 'file'
  withCredentials = false
  showFileList = false
  drag = false
  listType = 'text'
  autoUpload = true
  disabled = false
  beforeUpload = NOOP
  beforeRemove = NOOP
  onRemove = NOOP
  onChange = NOOP
  onPreview = NOOP
  onSuccess = NOOP
  onProgress = NOOP
  onError = NOOP
  onExceed = NOOP
}
