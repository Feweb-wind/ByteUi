<template>
  <div class="slider-demo-block">
    <span class="demonstration">Default value</span>
    <byte-slider v-model="value1" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Customized initial value</span>
    <byte-slider v-model="value2" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Hide Tooltip</span>
    <byte-slider v-model="value3" :show-tooltip="false" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Disabled</span>
    <byte-slider v-model="value4" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(0)
const value2 = ref(50)
const value3 = ref(0)
const value4 = ref(0)

</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .byte-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .byte-slider {
  flex: 0 0 70%;
}
</style>
