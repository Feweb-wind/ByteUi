<template>
  <div class="byte-input" :class="size">
    <input
    :class="disabled?'is-disabled':''"
    :type="type"
    :value="modelValue"
    :disabled="disabled"
    :maxlength="maxlength"
    :minlength="minlength"
    :readonly="readonly"
    :placeholder="placeholder"
    :showWordLimit="showWordLimit"
    @input="updateModelValue">
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
//props
const props = defineProps({
  //原生属性
  type:{
    type:String,
    default:'text',
    require:true
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  disabled:{//是否禁用
    type:Boolean,
    defalut:false
  },
  maxlength:Number,
  minlength:Number,
  readonly:{
    type:Boolean,
    default:false
  },
  placeholder:String,
  showWordLimit:{
    type:Boolean,
    default:false
  },
  showPassword:{//是否切换密码图标
    type:Boolean,
    defalut:true
  },
  size:{//大小,medium / small / mini
    type:String,
    validator(value:string) {
      // The value must match one of these strings
      return ['medium', 'small', 'mini'].includes(value)
    }
  }
})
//emits
const emit = defineEmits<{
  (e:'update:modelValue',newvalue:[string,Number]):[string,Number] //双向绑定事件
}>()
//实现双向绑定
const updateModelValue = (e:Event)=>{
    emit('update:modelValue',e.target.value)
}


</script>

<style lang="less">
//大小,medium / small / mini
  .medium[class="byte-input medium"]{
  height: 36px;
  }
  .small[class="byte-input small"]{
    height: 32px;
  }
  .mini[class="byte-input mini"]{
    height: 28px;
  }
.byte-input{
  width: 180px;
  height: 40px;
  input{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 100%;
    line-height: 100%;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  .is-disabled{
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>
