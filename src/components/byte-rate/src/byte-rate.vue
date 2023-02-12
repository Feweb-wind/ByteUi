<template>
    <div class="byte-rate" :style="controlDisabled">
        {{ modelValue }}
        <span v-for="item in max" :key="item" :val="item" class="byte-rate-item"
        @click.stop="updateModelValue(item)" 
        @mousemove="setCurrentValue(item)"
        @mouseleave="resetCurrentValue"
        >
            <byte-icon :class="[{hover:hoverIndex === item}]"  :color="starColor(item)">
                <template v-if="!disabled">
                    <component :is="activeComponent" v-show="currentValue >= item"></component>
                    <component :is="voidIcon" v-show="!(currentValue >= item)"></component>
                </template>
                <template v-if="disabled">
                    <component :is="disabledVoidIcon"></component>
                </template>
            </byte-icon>
        </span>
        <template v-if="showScore || showText">
            <span :style="`color:` + textColor + ';'">{{ renderText }}</span>
        </template>
    </div>
</template>
<script setup lang="ts">
import ByteIcon from '../../byte-icon.vue';
import { Message, Star, StarFilled } from '@element-plus/icons-vue';
import {computed, watch,ref, StyleValue} from 'vue'
import {rateProps,rateEmits} from './rate'
defineOptions({
  name: 'ByteRate',
})
const props = defineProps(rateProps)
const emits = defineEmits(rateEmits)
//更新双向绑定的值
const updateModelValue = (val:number) => {
    //更新当前的值
    currentValue.value = val
    emits('update:modelValue', val)
}
//监听props双向绑定的值，同步到currentValue中
watch(()=>props.modelValue,(newVal,oldVal)=>{
    currentValue.value = newVal
})
//悬浮当前悬浮的是第几科星星
const hoverIndex = ref(-1)
//当前是第几科星星
const currentValue = ref(props.modelValue)
//鼠标移入
const setCurrentValue = (item:number):void=>{
    currentValue.value = item
    hoverIndex.value = item
}
//鼠标移出
const resetCurrentValue = ():void=>{
    currentValue.value = props.modelValue
    hoverIndex.value = -1
}
//disabled 只读
const controlDisabled = computed<StyleValue>(()=>{
    return props.disabled ? 'pointer-events: none;' : ''
})
//showScore，或者showText 要渲染出的分数或文字
const renderText = computed<String>(()=>{
    let result:String = ''
    if(props.showScore){
        result = props.scoreTemplate.replace(/\{\s*value\s*\}/,props.modelValue.toString())
    }else if(props.showText){
        result = props.texts[Math.ceil(currentValue.value)-1]
    }
    return result
})
//计算星星的颜色
const judgeStatus = (item:number):number=>{//判断在三个区间中的哪一个
    let result:number = 0
        if(item<=props.lowThreshold){
            result = 0
        }else if(props.lowThreshold<item && item<props.highThreshold){
            result = 1
        }else if(item>=props.highThreshold){
            result = 2
        }
    return result
}
const starColor = computed<Function>(()=>{
    return(item:number):String=>{
        let result:String = ''
        if(!(currentValue.value>=item)){//未被选中
            if(props.disabled){
                result = props.disabledVoidColor
            }else{
                result = props.voidColor
            }
        }else{
            let num:number = judgeStatus(item)
            result = props.color[num]
        }
        return result
    }
})
// icons and voidIcon
const activeComponent = computed(()=>{
    let num:number = judgeStatus(currentValue.value)
    return props.icons[num]
})
</script>
<style lang="less" scoped>
.byte-rate{
    display: inline-flex;
    align-items: center;
    .byte-rate-item{
        display: flex;
        align-items: center;
        cursor: pointer;
        i{
            transition: .3s;
            margin-right: 6px;
        }
        .hover{
            transform: scale(1.15);
        }
    }
}
</style>