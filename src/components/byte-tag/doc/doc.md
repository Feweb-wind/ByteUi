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

[//]: # (<BasicUsage/>)
<CodePreview comp-name="byte-tag" demo-name="01_basic_usage">
    <BasicUsage/>
</CodePreview>

### 可移除标签
<RemovableTag/>

### 动态编辑标签
<DynamicEditableTag/>

### 不同尺寸
<DifferentSize/>

### 主题
<Theme/>

### 圆形标签
<CircleTag/>

### 可选中的标签
<SelectableTag/>