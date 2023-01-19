import { isNil } from 'lodash-unified'
import axios, { AxiosError } from 'axios'
import type {
  UploadProgressEvent,
  UploadRequestHandler,
  UploadRequestOptions,
} from './upload'

export class UploadHttpError extends Error {
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

export const axiosUpload: UploadRequestHandler = (
  option: UploadRequestOptions
) => {
  // 新建表单对象
  const formData = new FormData()
  // 拼接用户自定义data
  if (option.data) {
    for (const [key, value] of Object.entries(option.data)) {
      if (Array.isArray(value)) formData.append(key, ...value)
      else formData.append(key, value)
    }
  }
  // 拼接文件
  formData.append(option.filename, option.file, option.file.name)

  const headers: { [key: string]: string } = {}
  if (option.headers instanceof Headers) {
    option.headers.forEach((value, key) => (headers[key] = value))
  } else {
    for (const [key, value] of Object.entries(option.headers)) {
      if (isNil(value)) continue
      headers[key] = String(value)
    }
  }

  const http = axios({
    url: option.action,
    method: option.method,
    onUploadProgress(progressEvent) {
      const event = progressEvent as UploadProgressEvent
      event.percent = event.rate!
      option.onProgress(event)
    },
    withCredentials: option.withCredentials,
    data: formData,
    headers: headers,
  })
    .then(resp => {
      option.onSuccess(resp.data)
    })
    .catch(err => {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError
        option.onError(
          new UploadHttpError(
            error.message,
            Number(error.status),
            String(error.config?.method),
            String(error.config?.url)
          )
        )
      } else {
        option.onError(
          new UploadHttpError(
            `unexpectedError on ${option.method} ${option.action}`,
            500,
            option.method,
            option.action
          )
        )
      }
    })

  return http
}
