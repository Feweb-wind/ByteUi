<template>
  <div class="example">
    <div class="example-showcase">
      <slot></slot>
    </div>

    <!--  <byte-divider/>-->
    <hr />

    <div
      class="opt-btns"
      style="display: flex; flex-flow: row-reverse; align-items: center"
    >
      <img
        style="margin: 0 15px 10px 15px; cursor: pointer"
        width="14"
        src="./icons/code.svg"
        alt="code"
        @click="showSourceCode"
      />
      <img
        style="margin: 0 15px 10px 15px; cursor: pointer"
        width="14"
        src="./icons/copy.svg"
        alt="copy"
        @click="copySourceCode"
      />
    </div>

    <div class="example-source-wrapper" v-if="sourceCodeVisible">
      <div class="example-source">
        <highlightjs language="javascript" :code="sourceCode" />
      </div>
    </div>

    <div
      class="example-float-control"
      v-if="sourceCodeVisible"
      @click="hideSourceCode"
    >
      <img width="14" src="./icons/sort-up.svg" alt="up" />
      <span>隐藏源代码</span>
    </div>
  </div>
</template>

<script lang="ts">
import hljsVuePlugin from '@highlightjs/vue-plugin'

export default {
  components: {
    highlightjs: hljsVuePlugin.component,
  },
}
</script>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  compName: String,
  demoName: String,
  demoType: String,
})

const sourceCode = ref<string>('')
const sourceCodeVisible = ref<boolean>(false)
async function getSourceCode() {
  if (props.demoType === 'docs') {
    sourceCode.value = (
      await import(
        /* @vite-ignore */
        `../../../docs/examples/${props.compName}/${props.demoName}.vue?raw`
      )
    ).default
    // console.log(sourceCode.value)
  }
  //`docs/examples/${props.compName}/${props.demoName}.vue?raw`
  else {
    sourceCode.value = (
      await import(
        /* @vite-ignore */
        `@/components/${props.compName}/docs/${props.demoName}.vue?raw`
      )
    ).default
  }
}

onMounted(() => {
  getSourceCode()
})

const hideSourceCode = () => {
  sourceCodeVisible.value = false
}

const copySourceCode = () => {
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.setAttribute('value', sourceCode.value as string)
  input.setAttribute('readonly', 'readonly')
  input.select()
  input.setSelectionRange(0, 9999) // 如果select 没有选择到
  if (document.execCommand('copy')) {
    // TODO: byte-message component to remind user
    alert('success')
  }
  document.body.removeChild(input)
}

const showSourceCode = () => {
  sourceCodeVisible.value = !sourceCodeVisible.value
}
</script>

<style lang="less" scoped>
.example {
  border: 1px solid #dcdfe6;
  border-radius: 4px;

  .example-showcase {
    padding: 1.5rem;
    margin: 0.5px;
    background-color: #ffffff;
  }

  .example-source {
    background-color: #faf7fa;
  }

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;
  }

  .example-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: #909399;
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;

    span {
      font-size: 14px;
      margin-left: 10px;
    }
  }
}
</style>
