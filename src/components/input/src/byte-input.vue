<template>
  <div class="byte-input" :class="size">
    <!-- input区域 -->
    <template v-if="type !== 'textarea'">
      <div class="inner-input">
        <!-- prefix-icon -->
        <byte-icon v-if="prefixIcon" class="prefix-icon">
          <component :is="prefixIcon" />
        </byte-icon>
        <input
          ref="myinput"
          :class="[
            disabled ? 'is-disabled' : '',
            prefixIcon ? 'pre-inp' : '',
            suffixIcon ? 'suf-inp' : '',
          ]"
          :type="type"
          :value="modelValue"
          :disabled="disabled"
          :maxlength="maxlength"
          :minlength="minlength"
          :readonly="readonly"
          :placeholder="placeholder"
          @input="updateModelValue"
          @focus="event => emit('focus', event)"
          @blur="event => emit('blur', event)"
          @change="event => emit('change', event)"
        />
        <!-- suffix-icon -->
        <span v-if="suffix" class="suffix-icon">
          <template v-if="clearable">
            <span @click="clearInput">
              <byte-icon class="clear-icon">
                <component :is="suffixIcon" />
              </byte-icon>
            </span>
          </template>
          <template v-if="type === 'password' && showPassword">
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
import { ref, computed, onMounted } from 'vue'
import type { PropType, Component } from 'vue'
import { ByteIcon } from '@byte-ui/components'
//props
const props = defineProps({
  //原生属性
  type: {
    type: String,
    default: 'text',
    require: true,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  disabled: {
    //是否禁用
    type: Boolean,
    defalut: false,
  },
  maxlength: Number,
  minlength: Number,
  readonly: {
    //是否只读
    type: Boolean,
    default: false,
  },
  placeholder: String, //提示信息
  prefixIcon: [String, Object] as PropType<string | Component>, //前置图标
  suffixIcon: [String, Object] as PropType<string | Component>, //前置图标
  showWordLimit: {
    //限制长度
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  showPassword: {
    //是否切换密码图标
    type: Boolean,
    default: true,
  },
  size: {
    //大小,medium / small / mini
    type: String,
    validator(value: string) {
      // The value must match one of these strings
      return ['large', 'default', 'small'].includes(value)
    },
  },
})
//emits
const emit = defineEmits<{
  (e: 'update:modelValue', newvalue: string | number): string | number //双向绑定事件
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'change', event: Event): void
  (e: 'input', event: Event): void
}>()
//实现双向绑定
const updateModelValue = (e: Event) => {
  let target: EventTarget | null = e.target
  if (target !== null) {
    emit('update:modelValue', (target as HTMLInputElement).value)
  }
  emit('input', e)
}
//判断后置图标是否显示
const suffix = computed(() => {
  return (
    props.suffixIcon ||
    props.clearable ||
    props.showPassword ||
    (props.showWordLimit && props.maxlength)
  )
})
//清空input区域，仅当clearable props为true时 dom才被渲染出来
let myinput = ref<HTMLInputElement | null>(null) //input实例
onMounted(() => {
  // console.log(myinput.value)
})
const clearInput = (): void => {
  if (myinput.value !== null) {
    myinput.value.value = ''
  }
}
const test = (): void => {
  console.log('test')
}
//显示密码
const showInput = (): void => {
  if (myinput.value !== null) {
    let nowType: string = myinput.value.type
    if (nowType === 'password') {
      myinput.value.type = 'text'
    } else if (nowType === 'text') {
      myinput.value.type = 'password'
    }
  }
}
//显示字数限制
const blur = (): void => {
  myinput.value?.blur?.()
}
const focus = (): void => {
  myinput.value?.focus?.()
}

defineExpose({
  blur,
  focus,
})
</script>

<style lang="less">
@import '../style/byte-input.less';
</style>
