<template>
  <span :class="className" class="byte-check-tag" @click="handleChange">
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { checkTagEmits, checkTagProps } from './check-tag';
import {computed} from "vue";

const props = defineProps(checkTagProps);
const emit = defineEmits(checkTagEmits);
const className = computed(() => props.checked ? "is-checked" : "");

const handleChange = () => {
  const checked = !props.checked
  emit('update:checked', checked)
  emit('change', checked)
}
</script>

<style lang="less" scoped>
.byte-check-tag {
  background-color: #f4f4f5;
  border-radius: 4px;
  color: #909399;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  line-height: 14px;
  padding: 7px 15px;
  transition: all .3s cubic-bezier(.645 .045, .355, 1);
  font-weight: 700;
}

.byte-check-tag:hover {
  background-color: #dedfe0;
}

.byte-check-tag.is-checked {
  background-color: #d9ecff;
  color: #409eff;
}

.byte-check-tag.is-checked:hover {
  background-color: #c6efff;
}
</style>