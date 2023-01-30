---
title: Button
lang: zh-CN
layout: doc
---

<script setup>
import BasicComp from "../examples/button/01_basic.vue";
import DisabledComp from "../examples/button/02_disabled.vue";
import TextComp from "../examples/button/03_link.vue";
import IconComp from "../examples/button/04_icon.vue";
import ButtonGroupComp from "../examples/button/05_button_group.vue";
import LoadingComp from "../examples/button/06_loading.vue";
import SizeComp from "../examples/button/07_size.vue";
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

## 链接按钮
<CodePreview comp-name="button" demo-name="03_link" demo-type="docs">
    <TextComp/>
</CodePreview>

## 图标按钮
使用图标为按钮添加更多的含义。 你也可以单独使用图标不添加文字来节省显示区域占用。<br/>
使用 `icon` 属性来为按钮添加图标。 您可以在我们的 Icon 组件中找到所需图标。 通过向右方添加`<i>`标签来添加图标， 你也可以使用自定义图标。
<CodePreview comp-name="button" demo-name="04_icon" demo-type="docs">
<IconComp/>
</CodePreview>

## 按钮组
以按钮组的方式出现，常用于多项类似操作。<br/>
使用 `<el-button-group>` 对多个按钮分组。
<CodePreview comp-name="button" demo-name="05_button_group" demo-type="docs">
<ButtonGroupComp/>
</CodePreview>

## 加载状态按钮
点击按钮来加载数据，并向用户反馈加载状态。<br/>
通过设置 `loading` 属性为 `true` 来显示加载中状态。
<CodePreview comp-name="button" demo-name="06_loading" demo-type="docs">
<LoadingComp/>
</CodePreview>

## 调整尺寸
除了默认的大小，按钮组件还提供了几种额外的尺寸可供选择，以便适配不同的场景。
使用 `size` 属性额外配置尺寸，可使用 `large`和`small`两种值。
<CodePreview comp-name="button" demo-name="07_size" demo-type="docs">
<SizeComp/>
</CodePreview>

## Button API

### Button 属性

| 属性名            | 说明                                                             | 类型                                                         | 默认值 |
|------------------| --------------------------------------------------------------- |------------------------------------------------------------| ------- |
| size             | 尺寸                                                             | `string`'large','default','small'`                         | —       |
| type             | 类型                                                             | `string`'primary','success',<br/>'warning','danger','info' | —       |
| plain            | 是否为朴素按钮                                   | `boolean`                                                  | false   |
| text             | 是否为文字按钮                                    | `boolean`                                                  | false   |
| bg               | 是否显示文字按钮背景颜色         | `boolean`                                                  | false   |
| link             | 是否为链接按钮                                    | `boolean`                                                  | false   |
| round            | 是否为圆角按钮                                   | `boolean`                                                  | false   |
| circle           | 是否为圆形按钮                                  | `boolean`                                                  | false   |
| loading          | 是否为加载中状态                                          | `boolean`                                                  | false   |
| loading-icon     | 自定义加载中状态图标组件                                       | `string` / `Component`                                     | Loading |
| disabled         | 按钮是否为禁用状态                                                   | `boolean`                                                  | false   |
| icon             | 图标组件                                                         | `string` / `Component`                                     | —       |
| autofocus        | 原生 `autofocus` 属性                                     | `boolean`                                                  | false   |
| native-type      | 原生 `type` 属性                                          | `string`'button','submit','reset'`                         | button  |
| auto-insert-space | 自动在两个中文字符之间插入空格             | `boolean`                                                  | —       |
| color            | 自定义按钮颜色, 并自动计算 `hover` 和 `active` 触发后的颜色 | `string`                                                 | —       |

### Button 插槽

| 插槽名   | 说明           |
|---------| ------------- |
| default | 自定义默认内容   |
| loading | 自定义加载中组件 |
| icon    | 自定义图标组件   |

## ButtonGroup API

### ButtonGroup 属性

| 属性名 | 说明                                      | 类型                                                           | 默认值 |
| ---- | ------------------------------------------------ | -------------------------------------------------------------- | ------- |
| size | 用于控制该按钮组内按钮的大小 | `string`'large','default','small'`                       | —       |
| type | 用于控制该按钮组内按钮的类型 | `string`'primary','success',<br/>'warning','danger','info' | —       |

### ButtonGroup 插槽

| 插槽名    | 说明                    | 子标签 |
| ------- | ------------------------------ | ------- |
| default | 自定义按钮组内容 | Button  |
