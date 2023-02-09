---
title: Select
lang: zh-CN
---

<script setup>
import BasicComp from "../examples/select/01_basic.vue";
import ForbidComp from "../examples/select/02_forbid.vue";
import ForbidWholeComp from "../examples/select/03_forbid_whole.vue";
import ClearableComp from "../examples/select/04_clearable.vue";
</script>

# Select 选择器
当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法
适用广泛的基础单选 `v-model` 的值为当前被选中的 `byte-option` 的 `value` 属性值。
<CodePreview comp-name="select" demo-name="01_basic" demo-type="docs">
<BasicComp/>
</CodePreview>

## 有禁用选项
在 `byte-option` 中，设定 `disabled` 值为 true，即可禁用该选项
<CodePreview comp-name="select" demo-name="02_forbid" demo-type="docs">
<ForbidComp/>
</CodePreview>

## 禁用状态
禁用整个选择器组件
为 `byte-select` 设置 `disabled` 属性，则整个选择器不可用
<CodePreview comp-name="select" demo-name="03_forbid_whole" demo-type="docs">
<ForbidWholeComp/>
</CodePreview>

## 可清空单选
您可以使用清除图标来清除选择。
为 `byte-select` 设置 `clearable` 属性，则可将选择器清空。 需要注意的是，`clearable` 属性仅适用于单选。
<CodePreview comp-name="select" demo-name="04_clearable" demo-type="docs">
<ClearableComp/>
</CodePreview>