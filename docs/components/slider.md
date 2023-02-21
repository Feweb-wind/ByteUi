---
title: Slider 滑块
lang: zh-CN
---

<script setup>
import BasicComp from "../examples/slider/01_basic.vue";
import DispersedValue from "../examples/slider/02_dispersed_value.vue";
import DifferentSize from "../examples/slider/03_size.vue";
import PositionTooltip from "../examples/slider/04_position.vue";
import ShowVertical from "../examples/slider/05_vertical.vue";
</script>


# Slider 滑块
通过拖动滑块在一个固定区间内进行选择


## 基础用法
在拖动滑块时，显示当前值
- 通过设置绑定值自定义滑块的初始值

<CodePreview comp-name="slider" demo-name="01_basic" demo-type="docs">
<ClientOnly>
<BasicComp/>
</ClientOnly>
</CodePreview>


## 离散值
选项可以是离散的
- 改变step的值可以改变步长， 通过设置 show-stops 属性可以显示间断点

<CodePreview comp-name="slider" demo-name="02_dispersed_value" demo-type="docs">
<ClientOnly>
<DispersedValue/>
</ClientOnly>
</CodePreview>


## 不同尺寸

<CodePreview comp-name="slider" demo-name="03_size" demo-type="docs">
<ClientOnly>
<DifferentSize/>
</ClientOnly>
</CodePreview>


## 位置
您可以自定义 Tooltip 提示的位置。

<CodePreview comp-name="slider" demo-name="04_position" demo-type="docs">
<ClientOnly>
<PositionTooltip/>
</ClientOnly>
</CodePreview>


## 垂直模式
配置 vertical 属性为 true 启用垂直模式。 在垂直模式下，必须设置 height 属性。

<CodePreview comp-name="slider" demo-name="05_vertical" demo-type="docs">
<ClientOnly>
<ShowVertical/>
</ClientOnly>
</CodePreview>


## 属性
| 属性名 | 描述  | 类型 | 可选值  | 默认值 |
| ---- | ------------ | ----------- | ----- | ----- |
| model-value / v-model | 选中项绑定值 | `number` |   —   | 0 |
| min | 最小值 | `number` |   —   | 0 |
| max | 最大值 | `number` |   —   | 100 |
| disabled | 是否禁用 | `boolean` |   —   | `false` |
| step | 步长 | `number` |   —   | 1 |
| show-stops | 是否显示间断点 | `boolean` |   —   | `false` |
| show-input | 是否显示输入框 | `boolean` |   —   | `false` |
| size | 输入框尺寸，垂直模式下不可用 | `string` |   `large / default / small`   | `default` |
| show-tooltip | 是否显示提示信息 | `boolean` |   —   | `true` |
| placement | Tooltip 出现的位置 | `boolean` |   —   | `true` |
| vertical | 垂直模式 | `boolean` |   —   | `false` |


## 事件
| 事件 | 说明  | 参数 |
| ---- | ----  | ---- |
| change | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） | val，新状态的值 |
| input | 数据改变时触发（使用鼠标拖曳时，活动过程实时触发）  | 	val，改变后的值 |
