<template>
    <button class="el-button">
        <span>
            <slot></slot>
        </span>
    </button>
</template>
<script setup lang="ts">
</script>
<style lang="less" scoped>
.el-button{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    span{
        color: black;
    }
}
</style>