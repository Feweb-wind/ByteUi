---
title: Rate
lang: zh-CN
layout: doc
---


<script setup>
import BasicComp from "../examples/switch/01.vue"
</script>

# Switch 开关
表示两种相互对立的状态间的切换，多用于触发「开/关」。
## 基础用法
绑定 `v-model` 到一个 `Boolean` 类型的变量。 可以使用 `--el-switch-on-color` 属性与 `--el-switch-off-color` 属性来设置开关的背景色。
<CodePreview comp-name="switch" demo-name="01" demo-type="docs">
    <BasicComp/>
</CodePreview>