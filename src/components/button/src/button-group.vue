<template>
<div class="byte-button-group">
  <slot/>
</div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'ByteButtonGroup',
});
</script>

<style lang="less">
.byte-button-group {
  display: inline-block;
  vertical-align: middle;

  &::before {
    display: table;
    content: "";
  }

  &::after {
    clear: both;
    display: table;
    content: "";
  }

  .byte-button:first-child {
    border-right-color: rgba(255, 255, 255, 5);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .byte-button:not(:first-child):not(:last-child) {
    border-left-color: rgba(255, 255, 255, 5);
    border-right-color: rgba(255, 255, 255, 5);
    border-radius: 0;
  }

  .byte-button:last-child {
    border-left-color: rgba(255, 255, 255, 5);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .byte-button:not(:last-child) {
    margin-right: -1px;
  }
}
</style>