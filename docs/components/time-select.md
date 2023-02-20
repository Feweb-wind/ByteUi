---
title: Time-Picker 时间选择器
lang: zh-CN
layout: doc
---

<script setup>
import BasicComp from "../examples/time-select/01_basic.vue";
import FormatComp from "../examples/time-select/02_format.vue";
import RangeComp from "../examples/time-select/03_time-range.vue";
</script>

# TimeSelect 时间选择

用于选择或输入日期

可用时间范围是 00:00-23:59

:::tip

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (例如: [VitePress](https://vitepress.vuejs.org/)).

:::

## 固定时间点

提供几个固定的时间点供用户选择

使用 `byte-time-select` 标签，然后通过`start`、`end`和`step`指定起始时间，结束时间和步长。

<CodePreview comp-name="time-select" demo-name="01_basic" demo-type="docs">
  <ClientOnly>
    <BasicComp />
  </ClientOnly>
</CodePreview>

## 时间格式

使用 `format` 属性来控制时间格式 (小时以及分钟)。

在 [这里](https://day.js.org/docs/zh-CN/display/format) 查看 Day.js 支持的 format 参数。

:::warning

请一定要注意传入参数的大小写是否正确

:::

<CodePreview comp-name="time-select" demo-name="02_format" demo-type="docs">
  <ClientOnly>
    <FormatComp />
  </ClientOnly>
</CodePreview>

## 固定时间范围

如果先选中了开始（或结束）时间，则结束（或开始）时间的状态也将会随之改变。

<CodePreview comp-name="time-select" demo-name="03_range" demo-type="docs">
  <ClientOnly>
    <RangeComp />
  </ClientOnly>
</CodePreview>

## 属性

| 属性名                | 说明                                           | 类型                 | 可选值                                                       | 默认值      |
| :-------------------- | :--------------------------------------------- | :------------------- | :----------------------------------------------------------- | :---------- |
| model-value / v-model | 选中项绑定值                                   | string               | —                                                            | —           |
| disabled              | 禁用状态                                       | boolean              | —                                                            | false       |
| editable              | 文本框可输入                                   | boolean              | —                                                            | true        |
| clearable             | 是否显示清除按钮                               | boolean              | —                                                            | true        |
| size                  | 输入框尺寸                                     | string               | large / default / small                                      | default     |
| placeholder           | 非范围选择时的占位内容                         | string               | —                                                            | —           |
| name                  | 原生属性                                       | string               | —                                                            | —           |
| effect                | Tooltip 主题，内置了 `dark` / `light` 两种主题 | string               | string                                                       | light       |
| prefix-icon           | 自定义前缀图标组件                             | `string | Component` | —                                                            | Clock       |
| clear-icon            | 自定义清除图标组件                             | `string | Component` | —                                                            | CircleClose |
| start                 | 开始时间                                       | string               | —                                                            | 09:00       |
| end                   | 结束时间                                       | string               | —                                                            | 18:00       |
| step                  | 间隔时间                                       | string               | —                                                            | 00:30       |
| min-time              | 最早时间点，早于该时间的时间段将被禁用         | string               | —                                                            | 00:00       |
| max-time              | 最晚时间点，晚于该时间的时间段将被禁用         | string               | —                                                            | —           |
| format                | 设置时间格式                                   | string               | 详见 [格式表示](https://day.js.org/docs/en/display/format#list-of-all-available-formats) | HH:mm       |

## 事件

| 事件名 | 说明                        | 回调参数            |
| :----- | :-------------------------- | :------------------ |
| change | 用户确认选定的值时触发      | val，组件绑定值     |
| blur   | 在组件 Input 失去焦点时触发 | (event: FocusEvent) |
| focus  | 在组件 Input 获得焦点时触发 | (event: FocusEvent) |

## 方法

| 方法名 | 说明              | 参数 |
| :----- | :---------------- | :--- |
| focus  | 使 input 获取焦点 | —    |
| blur   | 使 input 失去焦点 | —    |
