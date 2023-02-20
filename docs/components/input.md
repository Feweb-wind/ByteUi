---
title: Input
lang: zh-CN
layout: doc
---

<script setup>
import BasicComp from "../examples/input/01.vue"
import DisComp from "../examples/input/02.vue"
import ClearComp from "../examples/input/03.vue"
import PassWComp from "../examples/input/04.vue"
</script>

# Input 
通过鼠标或键盘输入字符

:::danger
Input 为受控组件，它 总会显示 Vue 绑定值。

在正常情况下，input 的输入事件应该被正常响应。 它的处理程序应该更新组件的绑定值 (或使用 v-model)。 否则，输入框的值将不会改变。

不支持 v-model 修饰符。
:::
## 基础用法
通过`v-model`双向绑定输入框中的值
<CodePreview comp-name="input" demo-name="01" demo-type="docs">
    <BasicComp/>
</CodePreview>

## 禁用状态
通过 `disabled` 属性指定是否禁用 input 组件
<CodePreview comp-name="input" demo-name="02" demo-type="docs">
    <DisComp/>
</CodePreview>

## 一键清空
使用`clearable`属性即可得到一个可一键清空的输入框
<CodePreview comp-name="input" demo-name="03" demo-type="docs">
    <ClearComp/>
</CodePreview>

## 密码框
使用 `show-password` 属性即可得到一个可切换显示隐藏的密码框
<CodePreview comp-name="input" demo-name="04" demo-type="docs">
    <PassWComp/>
</CodePreview>