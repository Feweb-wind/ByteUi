---
title: Upload 上传
lang: zh-CN
layout: doc
---

<script setup>
import BasicComp from "../examples/upload/01_basic.vue";
import LimitCoverComp from "../examples/upload/02_limit-cover.vue"
import AvatarComp from "../examples/upload/03_avatar.vue"
import DragAndDropComp from "../examples/upload/04_drag-and-drop.vue"
import ManualComp from "../examples/upload/05_manual.vue"
</script>

# Upload 上传

通过点击或者拖拽上传文件。

## 基础用法

通过 `slot` 你可以传入自定义的上传按钮类型和文字提示。 可通过设置 `limit` 和 `on-exceed` 来限制上传文件的个数和定义超出限制时的行为。 可通过设置 `before-remove` 来阻止文件移除操作。

<CodePreview comp-name="upload" demo-name="01_basic" demo-type="docs">
  <BasicComp />
</CodePreview>

## 覆盖前一个文件

设置 `limit` 和 `on-exceed` 可以在选中时自动替换上一个文件。

<CodePreview comp-name="upload" demo-name="02_limit-cover" demo-type="docs">
  <LimitCoverComp />
</CodePreview>

## 用户头像

在 `before-upload` 钩子中限制用户上传文件的格式和大小。

<CodePreview comp-name="upload" demo-name="03_avatar" demo-type="docs">
  <AvatarComp />
</CodePreview>

## 拖拽上传

你可以将文件拖拽到特定区域以进行上传。

<CodePreview comp-name="upload" demo-name="04_drag-and-drop" demo-type="docs">
  <DragAndDropComp />
</CodePreview>

## 手动上传

<CodePreview comp-name="upload" demo-name="05_manual" demo-type="docs">
  <ManualComp />
</CodePreview>

## 上传 API

### 属性

| Name                              | Description                                                                                                                                                                           | Type                                                                                          | Default  | Required |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------- | -------- |
| `action`                          | request URL.                                                                                                                                                                          | `string`                                                                                      | —        | Yes      |
| `headers`                         | request headers.                                                                                                                                                                      | `Headers \| Record<string, any>`                                                              | —        | No       |
| `method`                          | set upload request method.                                                                                                                                                            | `string`                                                                                      | `'post'` | No       |
| `multiple`                        | whether uploading multiple files is permitted.                                                                                                                                        | `boolean`                                                                                     | `false`  | No       |
| `data`                            | additions options of request.                                                                                                                                                         | `Record<string, any>`                                                                         | —        | No       |
| `name`                            | key name for uploaded file.                                                                                                                                                           | `string`                                                                                      | `'file'` | No       |
| `with-credentials`                | whether cookies are sent.                                                                                                                                                             | `boolean`                                                                                     | `false`  | No       |
| `show-file-list`                  | whether to show the uploaded file list.                                                                                                                                               | `boolean`                                                                                     | `true`   | No       |
| `drag`                            | whether to activate drag and drop mode.                                                                                                                                               | `boolean`                                                                                     | `false`  | No       |
| `accept`                          | accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept), will not work when `thumbnail-mode === true`.                                     | `string`                                                                                      | —        | No       |
| `on-preview`                      | hook function when clicking the uploaded files.                                                                                                                                       | `(uploadFile: UploadFile) => void`                                                            | —        | No       |
| `on-remove`                       | hook function when files are removed.                                                                                                                                                 | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                                  | —        | No       |
| `on-success`                      | hook function when uploaded successfully.                                                                                                                                             | `(response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                   | —        | No       |
| `on-error`                        | hook function when some errors occurs.                                                                                                                                                | `(error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                    | —        | No       |
| `on-progress`                     | hook function when some progress occurs.                                                                                                                                              | `(evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`        | —        | No       |
| `on-change`                       | hook function when select file or upload file success or upload file fail.                                                                                                            | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                                  | —        | No       |
| `on-exceed`                       | hook function when limit is exceeded.                                                                                                                                                 | `(files: File[], uploadFiles: UploadUserFile[]) => void`                                      | —        | No       |
| `before-upload`                   | hook function before uploading with the file to be uploaded as its parameter. If `false` is returned or a `Promise` is returned and then is rejected, uploading will be aborted.      | `(rawFile: UploadRawFile) => Awaitable<void \| undefined \| null \| boolean \| File \| Blob>` | —        | No       |
| `before-remove`                   | hook function before removing a file with the file and file list as its parameters. If `false` is returned or a `Promise` is returned and then is rejected, removing will be aborted. | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>`                    | —        | No       |
| `file-list` / `v-model:file-list` | default uploaded files.                                                                                                                                                               | `UploadUserFile[]`                                                                            | `[]`     | No       |
| `list-type`                       | type of file list.                                                                                                                                                                    | `'text' \| 'picture' \| 'picture-card'`                                                       | `'text'` | No       |
| `auto-upload`                     | whether to auto upload file.                                                                                                                                                          | `boolean`                                                                                     | `true`   | No       |
| `http-request`                    | override default xhr behavior, allowing you to implement your own upload-file's request.                                                                                              | `(options: UploadRequestOptions) => XMLHttpRequest \| Promise<unknown>`                       | —        | No       |
| `disabled`                        | whether to disable upload.                                                                                                                                                            | `boolean`                                                                                     | `false`  | No       |
| `limit`                           | maximum number of uploads allowed.                                                                                                                                                    | `number`                                                                                      | —        | No       |

### Slots

| Name      | Description                         | Type                   |
| --------- | ----------------------------------- | ---------------------- |
| `default` | customize default content.          | -                      |
| `trigger` | content which triggers file dialog. | -                      |
| `tip`     | content of tips.                    | -                      |
| `file`    | content of thumbnail template.      | `{ file: UploadFile }` |

### Exposes

| Name           | Description                                                                                            | Type                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| `abort`        | cancel upload request.                                                                                 | `(file: UploadFile) => void`                                              |
| `submit`       | upload the file list manually.                                                                         | `() => void`                                                              |
| `clearFiles`   | clear the file list (this method is not supported in the `before-upload` hook).                        | `(status?: Array<"ready" \| "uploading" \| "success" \| "fail">) => void` |
| `handleStart`  | select the file manually.                                                                              | `(rawFile: UploadRawFile) => void`                                        |
| `handleRemove` | remove the file manually. `file` and `rawFile` has been merged. `rawFile` will be removed in `v2.2.0`. | `(file: UploadFile \| UploadRawFile, rawFile?: UploadRawFile) => void`    |


### 插槽

| 名称      | 描述                 | 类型                   |
| :-------- | :------------------- | :--------------------- |
| `default` | 自定义默认内容       | -                      |
| `trigger` | 触发文件选择框的内容 | -                      |
| `tip`     | 提示说明文字         | -                      |
| `file`    | 缩略图模板的内容     | `{ file: UploadFile }` |

### 方法

| 名称           | 描述                                                         | 类型                                                         |
| :------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `abort`        | 取消上传请求                                                 | `(file: UploadFile) => void`                                 |
| `submit`       | 手动上传文件列表                                             | `() => void`                                                 |
| `clearFiles`   | 清空已上传的文件列表（该方法不支持在 `before-upload` 中调用） | `(status?: Array<"ready" | "uploading" | "success" | "fail">) => void` |
| `handleStart`  | 手动选择文件                                                 | `(rawFile: UploadRawFile) => void`                           |
| `handleRemove` | 手动移除文件。 `file` 和`rawFile` 已被合并。 `rawFile` 将在 `v2.2.0` 中移除 | `(file: UploadFile | UploadRawFile, rawFile?: UploadRawFile) => void` |