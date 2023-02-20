---
title: Rate
lang: zh-CN
layout: doc
---

<script setup>
import BasicComp1 from "../examples/rate/01.vue";
import BasicComp2 from "../examples/rate/01-2.vue";
import TextComp from "../examples/rate/02.vue"
import IconComp from "../examples/rate/03.vue"
import ReadComp from "../examples/rate/04.vue"
</script>

# Rate 评分
评分组件
## 基础用法
默认不区分颜色。使用`v-model`来动态绑定评分所绑定的值
<CodePreview comp-name="rate" demo-name="01" demo-type="docs">
    <BasicComp1/>
</CodePreview>

区分颜色。使用`color`来绑定颜色
<CodePreview comp-name="rate" demo-name="01-2" demo-type="docs">
    <BasicComp2/>
</CodePreview>

## 辅助文字
用辅助文字直接地表达对应分数。
为组件设置 `show-text` 属性会在右侧显示辅助文字。通过设置 `texts` 可以为每一个分值指定对应的辅助文字。`texts` 为一个数组，长度应等于最大值 `max`。
<CodePreview comp-name="rate" demo-name="02" demo-type="docs">
    <TextComp/>
</CodePreview>

## 其它 icon
当有多层评价时，可以用不同类型的 icon 区分评分层级
<CodePreview comp-name="rate" demo-name="03" demo-type="docs">
    <IconComp/>
</CodePreview>

## 只读
只读的评分用来展示分数
<CodePreview comp-name="rate" demo-name="04" demo-type="docs">
    <ReadComp/>
</CodePreview>

## Attributes
|  参数    |   说明   |  	类型    |    可选值  |    默认值  |
| ---- | ---- | ---- | ---- | ---- |
| v-model	| 绑定值	|number	 |—	 |0|
|max|	最大分值	|number|	—|	5|
|disabled	|是否为只读	|boolean|	—	|false|
|allow-half|	是否允许半选	|boolean|	—	|false|
|low-threshold	|低分和中等分数的界限值，值本身被划分在低分中|	number	|—	|2|
|high-threshold	|高分和中等分数的界限值，值本身被划分在高分中|	number|	—	|4|
|colors|	icon 的颜色。若传入数组，共有 3 个元素，为 3 个分段所对应的颜色；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的颜色	|array/object	|—	|['#F7BA2A', '#F7BA2A', '#F7BA2A']|
|void-color|	未选中 icon 的颜色	|string|	—|	#C6D1DE|
|disabled-void-color	|只读时未选中 icon 的颜色|	string|	—	|#EFF2F7|
|icon-classes|	icon 的类名。若传入数组，共有 3 个元素，为 3 个分段所对应的类名；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的类名|	array/object	|—	|['el-icon-star-on', 'el-icon-star-on','el-icon-star-on']|
|void-icon-class|	未选中 icon 的类名|	string|	—	|el-icon-star-off|
|disabled-void-icon-class|	只读时未选中 icon 的类名|	string|	—|	el-icon-star-on|
|show-text|	是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容|	boolean|	—|	false|
|show-score|	是否显示当前分数，show-score 和 show-text 不能同时为真|	boolean|	—|	false|
|text-color	|辅助文字的颜色	|string|	—|	#1F2D3D|
|texts	|辅助文字数组|	array|	—	|['极差', '失望', '一般', '满意', '惊喜']|
|score-template	|分数显示模板|	string|	—	|{value}|

## Events
|   时间名称    |   说明   |  	回调参数    |   
| ---- | ---- | ---- | 
|change	| 分值改变时触发| 	改变后的分值| 