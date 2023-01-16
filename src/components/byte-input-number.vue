<template>
  <div class="byte-input-number">
    <span class="byte-input-number__decrease" @click="decrease">
      <i class="byte-icon">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"
          ></path>
        </svg>
      </i>
    </span>
    <ByteInput :value="value" />
    <span class="byte-input-number__increase" @click="increase">
      <i class="byte-icon">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
          ></path>
        </svg>
      </i>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ByteInput from './byte-input.vue'
let value = ref(1)
let setup = ref(5)

function decrease() {
  value.value -= setup.value
}

function increase() {
  value.value += setup.value
}
</script>

<style lang="less">
.byte-icon {
  height: 1em;
  width: 1em;
  line-height: 1em;
}
.byte-input-number {
  position: relative;
  display: inline-flex;
  width: 150px;
  line-height: 30px;
  box-sizing: border-box;

  .byte-input-number__decrease,
  .byte-input-number__increase {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    position: absolute;
    z-index: 1;
    top: 1px;
    bottom: 1px;
    width: 32px;
    background: #f5f7fa;
    color: #606266;
    cursor: pointer;
    font-size: 13px;
    user-select: none;
  }

  .byte-input-number__decrease:hover,
  .byte-input-number__increase:hover {
    color: #409eff;
  }

  .byte-input-number__decrease {
    border-radius: 4px 0 0 4px;
    left: 1px;
    border-right: 1px solid #dcdfe6;
  }

  .byte-input-number__increase {
    border-radius: 0 4px 4px 0;
    right: 1px;
    border-left: 1px solid #dcdfe6;
  }
  .byte-input__wrapper {
    padding-left: 42px;
    padding-right: 42px;
  }
  .byte-input__inner {
    text-align: center;
  }
}
</style>
