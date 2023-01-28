---
title: Button
lang: zh-CN
layout: doc
---

<script setup>
import BasicComp from "../examples/button/01_basic.vue";
import DisabledComp from "../examples/button/02_disabled.vue";
</script>

# Button 按钮
常用的操作按钮。
## 基础用法
使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。
<CodePreview comp-name="button" demo-name="01_basic" demo-type="docs">
    <BasicComp/>
</CodePreview>

## 禁用状态
你可以使用 `disabled` 属性来定义按钮是否被禁用。
使用 `disabled` 属性来控制按钮是否为禁用状态。 该属性接受一个 `Boolean` 类型的值。
<CodePreview comp-name="button" demo-name="02_disabled" demo-type="docs">
    <DisabledComp/>
</CodePreview>

## 基础用法

## 基础用法