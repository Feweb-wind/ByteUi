<template>
  <div
    ref="button"
    class="slider_btn-wrapper"
  ></div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.slider_btn-wrapper {
  &:hover {
    cursor: not-allowed;
  }
  .slider_btn {
    border-color: #a8abb2;
    &:hover {
      transform: scale(1);
      cursor: not-allowed;
    }
  }
}
</style>
