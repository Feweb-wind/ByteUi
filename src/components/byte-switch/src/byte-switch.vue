<template>
    <div class="byte-switch">
        <template v-if="(!inlinePrompt) && (inactiveText!=null)">
            <span class="byte-switch-inline-left">
                {{ inactiveText }}
            </span>
        </template>
        <span class="byte-switch-core" :style="switchCoreColor" @click="changeValue">
            <div class="byte-switch-action" :style="switchActionPos">

            </div>
        </span>
        <template v-if="(!inlinePrompt) && (activeText!=null)">
            <span class="byte-switch-inline-right">
                {{ activeText }}
            </span>
        </template>
    </div>
</template>
<script setup lang="ts">
import {computed,watch, ref, StyleValue} from 'vue'
import { switchProps,switchEmits } from './switch';
defineOptions({
  name: 'ByteSwitch',
})
const props = defineProps(switchProps)
const emits = defineEmits(switchEmits)

const switchValue = ref(props.modelValue)
//双向绑定
const updateModelValue = (val:boolean) => {
    //更新当前的值
    switchValue.value = val
    emits('update:modelValue', val)
}
//监听props双向绑定的值，同步到currentValue中
watch(()=>props.modelValue,(newVal,oldVal)=>{
    switchValue.value = newVal
})
//当前的颜色
const switchCoreColor = computed<StyleValue>(()=>{
    let color:StyleValue = props.activeColor

    if(!switchValue.value){
        color = props.inactiveColor
    }
    console.log(color)
    return `border-color: ${color}; background-color: ${color};`
})
//开关旋钮的位置
const switchActionPos = computed<StyleValue>(()=>{
    let pos:StyleValue = '1px'
    if(switchValue.value){
        pos = 'calc(100% - 17px)'
    }
    return `left: ${pos};`
})
//点击开关
const changeValue = ()=>{
    switchValue.value = !switchValue.value
    emits('update:modelValue',switchValue.value)
}
</script>
<style scoped lang="less">
@coreWidth:40px;
@coreHeight:20px;
//test 我也不知道宽高怎么设置合理，先写死吧
.byte-switch{
    display: flex;
    align-items: center;
    
    @inlineMargin:10px;
    .byte-switch-inline-left{
        margin-right: @inlineMargin;
    }
    .byte-switch-inline-right{
        margin-left: @inlineMargin;
    }
    .byte-switch-core{
        width: @coreWidth;
        height: @coreHeight;
        position: relative;
        display: inline-flex;
        align-items: center;
        border-radius: 10px;
        cursor: pointer;
        .byte-switch-action{
            position: absolute;
            left: 1px;
            width: 16px;
            height: 16px;
            background-color: #ffffff;
            border-radius: 100%;
            transition: all .2s linear;
        }
    }
}
</style>