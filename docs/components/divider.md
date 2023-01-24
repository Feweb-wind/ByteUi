---
title: Divider
lang: zh-CN
---

<script setup>
import BasicComp from "../examples/divider/01_basic.vue";
import TextComp from "../examples/divider/02_text.vue";
import DashedComp from "../examples/divider/03_dashed.vue";
import VerticalComp from "../examples/divider/04_vertical.vue";
</script>

# Divider 分割线
区隔内容的分割线。

## 基础用法
对不同段落的文本进行分割。
<CodePreview comp-name="divider" demo-name="01_basic" demo-type="docs">
<BasicComp/>
</CodePreview>

## 设置文案
可以在分割线上自定义文本内容
<CodePreview comp-name="divider" demo-name="02_text" demo-type="docs">
<TextComp/>
</CodePreview>

## 虚线
您可以设置分隔符的样式。
<CodePreview comp-name="divider" demo-name="03_dashed" demo-type="docs">
<DashedComp/>
</CodePreview>

## 垂直分隔线
<CodePreview comp-name="divider" demo-name="04_vertical" demo-type="docs">
<VerticalComp/>
</CodePreview>

## Divider 属性
| 属性名             | 说明                                                | 类型  | 可选值                                                                   | 默认值    |
| ---------------- | ---------------------------------------------------------- | ------ | --------------------------------------------------------------------------------- | ---------- |
| direction        | 设置分割线方向                                   | string | horizontal / vertical                                                             | horizontal |
| border-style     | 设置分隔符样式                                   | string | [CSS/border-style](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style) | solid      |
| content-position | 自定义分隔线内容的位置| string | left / right / center                                                             | center     |

## 插槽

| 事件名 | Description                            |
|-----| -------------------------------------- |
| —   | 设置分割线文案的位置 |
