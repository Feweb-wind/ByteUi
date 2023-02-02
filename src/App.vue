<template>
  <div style="width: 600px;margin-bottom: 20px;">
    <ByteScrollbar ref="scrollbarRef"  height="400px" always @scroll="scroll">
      <div ref="innerRef">
        <p v-for="item in 20">{{ item }}新年快乐，兔年大吉！</p>
      </div>
    </ByteScrollbar>
    
    <ByteSlider :max="max" v-model="value" @input="inputSlider"/>
  </div>
</template>

<script lang="ts" setup>
import ByteSlider from "@/components/slider/index";
import ByteScrollbar from "@/components/scrollbar/index";
import { onMounted, ref } from "vue";

const max = ref(0)
const value = ref<number>(0)
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ByteScrollbar>>()

onMounted(() => {
  max.value = innerRef.value!.clientHeight - 380
})

const inputSlider = (value: number) => {
  scrollbarRef.value!.setScrollTop(value)
}

const scroll = ({ scrollTop }: {scrollTop:number}) => {
  value.value = scrollTop
}

</script>

<style lang="less" scoped>
</style>
