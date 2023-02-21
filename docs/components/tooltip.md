---
title: Tag
lang: zh-CN
---

<script setup>
import BasicComp from "../examples/tooltip/01_basic.vue";
import ThemeComp from "../examples/tooltip/02_theme.vue";
import MoreContentComp from "../examples/tooltip/03_more_content.vue";
</script>


# Tooltip 文字提示
常用于展示鼠标 hover 时的提示信息。

## 基础用法
在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

使用 `content` 属性来决定 `hover` 时的提示信息。 由 `placement` 属性决定展示效果： `placement`属性值为：`[方向]-[对齐位置]`；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。 如 `placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

<CodePreview comp-name="tooltip" demo-name="01_basic" demo-type="docs">
<ClientOnly>
<BasicComp/>
</ClientOnly>
</CodePreview>

## 主题
Tooltip 组件内置了两个主题：`dark`和`light`。
通过设置 `effect` 来修改主题，默认值为 `dark`。
<CodePreview comp-name="tooltip" demo-name="02_theme" demo-type="docs">
<ClientOnly>
<ThemeComp/>
</ClientOnly>
</CodePreview>

## 更多内容的文字提示
展示多行文本或者是设置文本内容的格式
用具名 slot `content`，替代`tooltip`中的`content`属性。
<CodePreview comp-name="tooltip" demo-name="03_more_content" demo-type="docs">
<ClientOnly>
<MoreContentComp/>
</ClientOnly>
</CodePreview>