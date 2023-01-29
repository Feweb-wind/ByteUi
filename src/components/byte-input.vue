<template>
  <div class="byte-input" :class="size">
    <!-- input区域 -->
    <template v-if="type !== 'textarea'">
      <div class="inner-input">
        <!-- prefix-icon -->
        <span v-if="prefixIcon" class="prefix-icon">
          pre
        </span>
        <input
        ref="myinput"
        :class="[disabled?'is-disabled':'' , prefixIcon?'pre-inp':'', suffixIcon?'suf-inp':'']"
        :type="type"
        :value="modelValue"
        :disabled="disabled"
        :maxlength="maxlength"
        :minlength="minlength"
        :readonly="readonly"
        :placeholder="placeholder"
        @input="updateModelValue" >
        <!-- suffix-icon -->
        <span v-if="suffix" class="suffix-icon">
          <template v-if="clearable">
            <span @click="clearInput">x</span>
          </template>
          <template v-if="showPassword">
            <span @click="showInput">e</span>
          </template>
          <template v-if="showWordLimit && maxlength">
            <span>{{ modelValue.toString().length }} / {{ maxlength }}</span>
          </template>
        </span>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref ,computed,onMounted} from 'vue'
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
  readonly:{//是否只读
    type:Boolean,
    default:false
  },
  placeholder:String,//提示信息
  prefixIcon:String,//前置图标
  suffixIcon:String,//前置图标
  showWordLimit:{//限制长度
    type:Boolean,
    default:false
  },
  clearable:{
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
  let target:EventTarget|null = e.target 
  if(target!==null){
    emit('update:modelValue',target.value)
  }
}
//判断后置图标是否显示
const suffix = computed(
  ()=>{
    return props.suffixIcon || props.clearable || props.showPassword || (props.showWordLimit && props.maxlength)
  }
)
//清空input区域，仅当clearable props为true时 dom才被渲染出来
let myinput = ref<HTMLInputElement|null>(null) //input实例
onMounted(()=>{
  console.log(myinput.value)
})
const clearInput = ():void=>{
  if(myinput.value!==null){
    myinput.value.value = ''
  }
}
const test = ():void=>{
  console.log('test')
}
//显示密码
const showInput = ():void=>{
  if(myinput.value!==null){
    let nowType:string = myinput.value.type 
    if(nowType === 'password'){
      myinput.value.type = 'text'
    }else if(nowType === 'text'){
      myinput.value.type = 'password'
    }
  }
}
//显示字数限制

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
  .inner-input{
    display: flex;
    position: relative;
    height: 100%;
    .prefix-icon,
    .suffix-icon{
      position: absolute;
      height: 100%;
      top: 0;
      text-align: center;
      color: #c0c4cc;
      transition: all .3s;
      pointer-events: auto;
      cursor: pointer;
      //以下代码测试用
      display: flex;
      align-items: center;
      z-index: 10;
    }
    .prefix-icon{
      left: 5px;
    }
    .suffix-icon{
      right: 5px;
    }
    input{
      cursor: pointer;
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
      pointer-event: auto;
      //选中焦点边框样式
      &:focus{
        outline: none;
        border-color: #409eff;
      }
    }
    //有prefixicon时input要做出的调整
    .pre-inp{
      padding-left: 30px;
    }
    //有suffixicon时input要做出的调整
    .suf-inp{
      padding-right: 30px;
    }
    .is-disabled{
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
</style>
