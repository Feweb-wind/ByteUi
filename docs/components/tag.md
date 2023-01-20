---
title: Tag
lang: zh-CN
---

<script setup>
import BasicComp from "../examples/tag/01_basic.vue";
import RemovableComp from "../examples/tag/02_removable.vue";
import DynamicComp from "../examples/tag/03_dynamic_editable.vue";
import DifferentSizeComp from "../examples/tag/04_different_size.vue";
import ThemeComp from "../examples/tag/05_theme.vue";
import RoundComp from "../examples/tag/06_round.vue";
import SelectableComp from "../examples/tag/07_selectable.vue";
</script>

# Tag 标签
用于标记和选择。

## 基础用法
由 `type` 属性来选择 tag 的类型。 也可以通过 `color` 属性来自定义背景色。
<CodePreview comp-name="tag" demo-name="01_basic" demo-type="docs">
    <BasicComp/>
</CodePreview>


## 可移除标签

设置 `closable` 属性可以定义一个标签是否可移除。 它接受一个 `Boolean`。 默认的标签移除时会附带渐变动画。 如果不想使用，可以设置 `disable-transitions` 属性，它接受一个 `Boolean`，`true` 为关闭。 当 Tag 被移除时会触发 `close` 事件。

<CodePreview comp-name="tag" demo-name="02_removable" demo-type="docs">
    <RemovableComp/>
</CodePreview>

## 动态编辑标签
动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现。
<CodePreview comp-name="tag" demo-name="03_dynamic_editable" demo-type="docs">
    <DynamicComp/>
</CodePreview>

## 不同尺寸
动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现。
<CodePreview comp-name="tag" demo-name="03_dynamic_editable" demo-type="docs">
    <DifferentSizeComp/>
</CodePreview>

## 主题
动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现。
<CodePreview comp-name="tag" demo-name="04_different_size" demo-type="docs">
    <ThemeComp/>
</CodePreview>

## 圆形标签
动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现。
<CodePreview comp-name="tag" demo-name="06_round" demo-type="docs">
    <RoundComp/>
</CodePreview>

## 可选中的标签
有时候因为业务需求，我们可能会需要用到类似复选框的标签，但是按钮式的复选框的样式又不满足需求，此时我们就可以用到 `check-tag`组件。

check-tag 的基础使用方法，check-tag 提供的 API 非常简单。
<CodePreview comp-name="tag" demo-name="06_round" demo-type="docs">
    <SelectableComp/>
</CodePreview>

## Tag属性

| 名称                 | 说明                          | 类型      | 可选值             | 默认值 |
|--------------------| ------------------------------------ |---------| --------------------------- | ------- |
| type               | 类型                       | string  | success/info/warning/danger | —       |
| closable           | 是否可关闭           | boolean | —                           | false   |
| disable-transitions | 是否禁用渐变动画        | boolean | —                           | false   |
| hit                | 是否有边框描边 | boolean | —                           | false   |
| color              | 背景色          | string  | —                           | —       |
| size               | 尺寸                             | string  | large / default /small      | default |
| effect             | 主题                      | string  | dark / light / plain        | light   |
| round              | Tag 是否为圆形               | boolean | —                           | false   |

## Tag 事件
| 名称  | 说明                  | 	参数 |
| ----- | ---------------------------- | ---------- |
| click | 点击 Tag 时触发的事件 | —          |
| close | 关闭 Tag 时触发的事件 | —          |

## Tag 插槽
| 名称 | 说明               |
| ---- | ------------------------- |
| —    | 自定义默认内容 |

## CheckTag 属性
| 名称    | 说明 | 类型    | 可选值 | 默认值 |
| ------- | ----------- | ------- | --------------- | ------- |
| checked | 是否选中  | boolean | true/false      | —       |

## CheckTag 事件
| 名称   | 说明                        | 参数 |
| ------ | ---------------------------------- | ---------- |
| change | 点击 Check Tag 时触发的事件 | checked    |

## CheckTag 插槽
| 名称 | 说明               |
| ---- | ------------------------- |
| —    | 自定义默认内容 |