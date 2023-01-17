<template>
  <input type="radio" name="radio" class="el-radio" />
  <span>
    <slot></slot>
  </span>
  <br/>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.el-radio{
  span{
    color: black;
  }
}
</style>