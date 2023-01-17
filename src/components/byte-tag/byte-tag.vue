<template>
  <span
    :class="className"
  >
    <span><slot></slot></span>
  </span>
</template>

<script setup lang="ts">
import {computed, defineProps} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  closable: Boolean,
  disableTransitions: Boolean,
  hit: Boolean,
  color: String,
  size: {
    type: String,
    default: "default"
  },
  effect: {
    type: String,
    default: "light"
  },
  round: Boolean
});

const className = computed(() => [props.type === "" ? "byte-tag" : `byte-tag byte-tag-${props.type}`]);

</script>

<style lang="less" scoped>
@byte-tag-bg-color-primary: #ecf5ff;
@byte-tag-bg-color-success: #f0f9eb;
@byte-tag-bg-color-info: #f4f4f5;
@byte-tag-bg-color-warning: #fdf6ec;
@byte-tag-bg-color-danger: #fef0f0;

@byte-tag-border-color-primary: #d9ecff;
@byte-tag-border-color-success: #f0f9eb;
@byte-tag-border-color-info: #e9e9eb;
@byte-tag-border-color-warning: #faecd8;
@byte-tag-border-color-danger: #fde2e2;

@byte-tag-text-color-primary: #409eff;
@byte-tag-text-color-success: #67c23a;
@byte-tag-text-color-info: #909399;
@byte-tag-text-color-warning: #e6a23c;
@byte-tag-text-color-danger: #f56c6c;

.byte-tag {
  box-sizing: border-box;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid @byte-tag-border-color-primary;
  color: @byte-tag-text-color-primary;
  background: @byte-tag-bg-color-primary;
  height: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;

  span {
    padding: 0 9px;
    line-height: 12px;
  }
}

.byte-tag-success {
  border: 1px solid @byte-tag-border-color-success;
  color: @byte-tag-text-color-success;
  background: @byte-tag-bg-color-success;
}

.byte-tag-info {
  border: 1px solid @byte-tag-border-color-info;
  color: @byte-tag-text-color-info;
  background: @byte-tag-bg-color-info;
}

.byte-tag-warning {
  border: 1px solid @byte-tag-border-color-warning;
  color: @byte-tag-text-color-warning;
  background: @byte-tag-bg-color-warning;
}

.byte-tag-danger {
  border: 1px solid @byte-tag-border-color-danger;
  color: @byte-tag-text-color-danger;
  background: @byte-tag-bg-color-danger;
}
</style>