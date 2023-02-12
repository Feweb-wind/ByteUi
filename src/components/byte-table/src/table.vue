<template>
    <div class="byte-table">
        <div class="hidden-columns">
            <slot></slot>
        </div>
        <!-- <div class="header-wrapper">
            <table>
                <table-header></table-header>
            </table>
        </div> -->
        <div :class="['body-wrapper',border?'border':'']">
            <table>
                <table-header></table-header>
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

</style>