<template>
<div style="width: 100vw; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center">
  HomePage<br/>
  <ByteTooltip
      content="hhhh have a try<br/><hr style='height: 0.5px'/>lalala"
      placement="left-end"
      :show-arrow="true"
      effect="light"
  >
    <!--    something-->
    <!--  <button style="background-color: green; ">something</button>  -->
    <button style="background-color: green; ">something</button>

  </ByteTooltip>
  <br/>
  <br/>
  <br/>
  <br/>
  <ByteTooltip
      content="hhhh have a try<br/><hr style='height: 0.5px'/>lalala"
      placement="left-start"
      :show-arrow="true"
  >
    <!--    something-->
    <!--  <button style="background-color: green; ">something</button>  -->
    <button style="background-color: green; ">something</button>

  </ByteTooltip>

  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <ByteTooltip
      content="hhhh have a try<br/><hr style='height: 0.5px'/>lalala"
      placement="left"
      :show-arrow="true"
  >
    <!--    something-->
    <!--  <button style="background-color: green; ">something</button>  -->
    <button style="background-color: green; ">something</button>

  </ByteTooltip>
</div>
</template>

<script setup>
import ByteTooltip from "./components/byte-tooltip/src/tooltip.vue"
</script>

<style lang="less" scoped>


</style>