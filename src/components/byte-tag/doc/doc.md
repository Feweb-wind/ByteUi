## Tag 标签
用于标记和选择
<script setup lang="ts">
import CodePreview from "@/components/CodePreview/index.vue";
import BasicUsage from "./01_basic_usage.vue";
import RemovableTag from "./02_Removable_Tag.vue";
import DynamicEditableTag from "./03_Dynamic_Editable_Tag.vue";
import DifferentSize from "./04_Different_Size.vue";
import Theme from "./05_Theme.vue";
import CircleTag from "./06_Circle_Tag.vue";
import SelectableTag from "./07_Selectable_Tag.vue";
</script>

### 基础用法
由 `type` 属性来选择 tag 的类型。 也可以通过 `color` 属性来自定义背景色。

<CodePreview comp-name="byte-tag" demo-name="01_basic_usage">
    <BasicUsage/>
</CodePreview>

### 可移除标签
<CodePreview comp-name="byte-tag" demo-name="02_Removable_Tag">
    <RemovableTag/>
</CodePreview>


### 动态编辑标签
<CodePreview comp-name="byte-tag" demo-name="02_Removable_Tag">
    <DynamicEditableTag/>
</CodePreview>

### 不同尺寸
Tag 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。
使用 `size` 属性来设置额外尺寸, 可选值包括 `large`, `default` 或 `small`

<CodePreview comp-name="byte-tag" demo-name="04_Different_Size">
    <DifferentSize/>
</CodePreview>

### 主题
<CodePreview comp-name="byte-tag" demo-name="05_Theme">
    <Theme/>
</CodePreview>


### 圆形标签
<CodePreview comp-name="byte-tag" demo-name="06_Circle_Tag">
    <CircleTag/>
</CodePreview>


### 可选中的标签
<CodePreview comp-name="byte-tag" demo-name="07_Selectable_Tag">
    <SelectableTag/>
</CodePreview>


### Attributes

|         Name          | Description                           |   Type    |        Accepted Values        |  Default  |
|:---------------------:|:-------------------------------------:|:---------:|:-----------------------------:|:---------:|
|         type          | component type                        |  string   |  success/info/warning/danger  |     —     |
|       closable        | whether Tag can be removed            |  boolean  |               —               |   false   |
|  disable-transitions  | whether to disable animations         |  boolean  |               —               |   false   |
|          hit          | whether Tag has a highlighted border  |  boolean  |               —               |   false   |
|         color         | background color of the Tag           |  string   |               —               |     —     |
|         size          | tag size                              |  string   |    large / default /small     |  default  |
|        effect         | component theme                       |  string   |     dark / light / plain      |   light   |
|         round         | whether Tag is rounded                |  boolean  |               —               |   false   |

### Events

| Name  | Description                  | Parameters |
| ----- | ---------------------------- | ---------- |
| click | triggers when Tag is clicked | —          |
| close | triggers when Tag is removed | —          |

### Slots

| Name | Description               |
| ---- | ------------------------- |
| —    | customize default content |

### CheckTag Attributes

| Name    | Description | Type    | Accepted Values | Default |
| ------- | ----------- | ------- | --------------- | ------- |
| checked | is checked  | boolean | true/false      | —       |

### CheckTag Events

| Name   | Description                        | Parameters |
| ------ | ---------------------------------- | ---------- |
| change | triggers when Check Tag is clicked | checked    |

### CheckTag Slots

|  Name  |         Description         |
|:------:|:---------------------------:|
|   —    |  customize default content  |
