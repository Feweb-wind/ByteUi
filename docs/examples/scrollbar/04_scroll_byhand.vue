<template>
  <div>
    <ByteScrollbar ref="scrollbarRef"  height="300px" always @scroll="scroll">
      <div ref="innerRef">
        <p v-for="item in 20" style="text-align: center;" :key="item">{{ item }}新年快乐，兔年大吉！</p>
      </div>
    </ByteScrollbar>
    <div style="margin-top: 20px;">
      <ByteSlider :max="max" v-model="value" @input="inputSlider"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ByteScrollbar, ByteSlider} from "@byte-ui/components";
import { onMounted, ref } from "vue";

const max = ref(0)
const value = ref<number>(0)
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ByteScrollbar>>()

onMounted(() => {
  max.value = innerRef.value!.clientHeight - 300 + 32
})

const inputSlider = (value: number) => {
  scrollbarRef.value!.setScrollTop(value)
}

const scroll = ({ scrollTop }: {scrollTop:number}) => {
  value.value = scrollTop
}

</script>


