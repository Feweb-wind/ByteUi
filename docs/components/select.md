---
title: Select
lang: zh-CN
---

<script setup>
import BasicComp from "../examples/select/01_basic.vue";
import ForbidComp from "../examples/select/02_forbid.vue";
</script>

# Select 选择器
当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法
适用广泛的基础单选 `v-model` 的值为当前被选中的 `byte-option` 的 `value` 属性值。
<CodePreview comp-name="select" demo-name="01_basic" demo-type="docs">
<ClientOnly>
<BasicComp/>
</ClientOnly>
</CodePreview>

## 有禁用选项
在 `byte-option` 中，设定 `disabled` 值为 true，即可禁用该选项
<CodePreview comp-name="select" demo-name="02_forbid" demo-type="docs">
<ClientOnly>
<ForbidComp/>
</ClientOnly>
</CodePreview>