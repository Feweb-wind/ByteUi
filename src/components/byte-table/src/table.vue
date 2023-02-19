<template>
    <div class="byte-table">
        <div class="hidden-columns">
            <slot></slot>
        </div>
        <div class="header-wrapper" v-if="showHeader && tableLayout === 'fixed' ">
            <table>
                <hColgroup :columns="store.getStates().columns" :table-layout="tableLayout"></hColgroup>
                <table-header></table-header>
            </table>
        </div>
        <div :class="['body-wrapper fix-head',border?'border':'']">
            <table class="test">
                <hColgroup :columns="store.getStates().columns" :table-layout="tableLayout"></hColgroup>
                <table-header v-if="showHeader && tableLayout === 'auto'"></table-header>
                <table-body :stripe="stripe"></table-body>
            </table>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref,getCurrentInstance,ComponentInternalInstance} from 'vue'
import { TableInstance } from './store';
import { tableProps } from './table/default';
import tableHeader from './table-header';
import TableBody from './table-body'
import { hColgroup } from './hColgroup';
import {TableStore} from './store'
import './style.less'
//props
const props = defineProps(tableProps)
const store = TableStore()
const instance:TableInstance<7> = getCurrentInstance() as TableInstance<7>
instance.store = store
store.commit('setData',props.data)

</script>
<style lang="less" scoped>

// .fix-head{
//     height: 206px;
//     position: relative;
//     width: 800px;
//     overflow: auto;
//     .test{
//         table-layout: fixed;
//         width: 100%;
       
//     }
// }

</style>