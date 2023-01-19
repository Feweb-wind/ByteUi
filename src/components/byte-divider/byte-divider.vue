<template>
  <div
      class="byte-divider"
      :class="direct"
      :style="border"
      role="separator"
  >
    <div
        :class="pos"
        class="byte-divider-text"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {dividerProps} from "@/components/byte-divider/divider.ts";
import {computed, ref} from "vue";

const direct = computed(() => props.direction === "horizontal" ? "byte-divider-horizontal" : "byte-divider-vertical");
const pos = computed(() => "is-" + props.contentPosition);
const props = defineProps(dividerProps);
const border = computed(() => {
  if (props.direction === "horizontal"){
    return "border-top-style:" + props.borderStyle;
  }
  else {
    return "border-left-style:" + props.borderStyle;
  }
});
</script>

<style lang="less" scoped>
.byte-divider {
  position: relative;

  .byte-divider-text {
    position: absolute;
    background-color: #ffffff;
    padding: 0 20px;
    font-weight: 500;
    color: #303133;
    font-size: 14px;
  }

  .is-left {
    position: absolute;
    left: 20px;
    transform: translateY(-50%);
  }
  .is-right {
    position: absolute;
    right: 20px;
    transform: translateY(-50%);
  }
  .is-center {
    position: absolute;
    left: 50%;
    transform: translate(-50%) translateY(-50%);
  }
}
.byte-divider-horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 24px 0;
  border-top-color: #dcdfe6 !important;
  border-top-width: 1px !important;
  border-top-style: solid;
}

.byte-divider-vertical {
  display: inline-block;
  width: 1px;
  height: 1em;
  margin: 0 8px;
  vertical-align: middle;
  position: relative;
  border-left-width: 1px !important;
  border-top-color: #dcdfe6 !important;
  border-top-style: solid;
}
</style>