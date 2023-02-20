---
title: Input
lang: zh-CN
layout: doc
---

<script setup>
import BasicComp from "../examples/input/01-basic.vue"
import DisComp from "../examples/input/02-dis.vue"
import ClearComp from "../examples/input/03-clear.vue"
import PassWComp from "../examples/input/04-passw.vue"
import IconComp from "../examples/input/05-icon.vue"
import SizeComp from "../examples/input/06-size.vue"
import LimitComp from "../examples/input/07-limit.vue"
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

## 带图标的输入框
带有图标标记输入类型

要在输入框中添加图标，你可以简单地使用 `prefix-icon` 和 `suffix-icon` 属性。 另外， `prefix` 和 `suffix` 命名的插槽也能正常工作。
<CodePreview comp-name="input" demo-name="05" demo-type="docs">
    <IconComp/>
</CodePreview>

## 尺寸
使用 `size` 属性改变输入框大小。 除了默认大小外，还有另外两个选项： `small`, `mini`
<!-- <CodePreview comp-name="input" demo-name="06" demo-type="docs">
    <SizeComp/>
</CodePreview> -->

## 输入长度限制
使用 `maxlength` 和 `minlength `属性, 来控制输入内容的最大字数和最小字数。 "字符数"使用JavaScript字符串长度来衡量。 为文本或文本输入类型设置 `maxlength` prop可以限制输入值的长度。 允许你通过设置 `show-word-limit` 到 `true` 来显示剩余字数。
<CodePreview comp-name="input" demo-name="07" demo-type="docs">
    <LimitComp/>
</CodePreview>