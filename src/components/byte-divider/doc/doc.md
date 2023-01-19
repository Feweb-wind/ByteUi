## Divider 分割线
区隔内容的分割线。
<script setup lang="ts">
import CodePreview from "@/components/CodePreview/index.vue";
import BasicDivider from "./01_basic.vue";
import TextDivider from "./02_text.vue";
import DashedDivider from "./03_dashed.vue";
import VerticalDivider from "./04_vertical.vue";
</script>

### 基础用法
对不同段落的文本进行分割。

<CodePreview comp-name="byte-divider" demo-name="01_basic">
    <BasicDivider/>
</CodePreview>

### 设置文案
可以在分割线上自定义文本内容。
<CodePreview comp-name="byte-divider" demo-name="02_text">
    <TextDivider/>
</CodePreview>

### 虚线
您可以设置分隔符的样式。
<CodePreview comp-name="byte-divider" demo-name="03_dashed">
    <DashedDivider/>
</CodePreview>

### 垂直分割线
<CodePreview comp-name="byte-divider" demo-name="04_vertical">
    <VerticalDivider/>
</CodePreview>

### Attributes
