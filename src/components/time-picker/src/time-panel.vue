<template>
  <div :class="ns.e('content')">
    <time-spinner  v-model="date"/>
  </div>
  <div :class="ns.e('footer')">
    <span>{{ date.toLocaleTimeString() }}</span>
    <button :class="[ns.e('btn'), 'cancel']">Canel</button>
    <button :class="[ns.e('btn'), 'confirm']">OK</button>
  </div>
</template>

<script lang="ts" setup>
import TimeSpinner from './time-spinner.vue'
import { useNamespace } from '@/hooks'
import { ref } from 'vue';

const ns = useNamespace('time-panel')

const date = ref(new Date())
</script>

<style lang="less">
.byte-time-panel__content {
  display: flex;
  position: relative;
}
.byte-time-panel__content::before {
  content: '';
  position: absolute;
  top: 50%;
  margin-top: -16px;
  margin-left: 12%;
  margin-right: 12%;
  height: 32px;
  left: 0;
  right: 0;
  border-top: 1px solid #e4e7ed;
  border-bottom: 1px solid #e4e7ed;
}
.byte-time-panel__footer {
  border-top: 1px solid #e4e7ed;
  text-align: right;
  padding: 4px;
  height: 36px;
  line-height: 25px;
  box-sizing: border-box;

  .byte-time-panel__btn {
    &.confirm {
      font-weight: 800;
      color: #409eff;
    }
    border: none;
    line-height: 28px;
    padding: 0 5px;
    margin: 0 5px;
    cursor: pointer;
    background-color: transparent;
    outline: none;
    font-size: 12px;
    color: var(--el-text-color-primary);
  }
}
</style>
