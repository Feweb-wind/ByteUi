<template>
  <byte-tag
      v-for="tag in dynamicTags"
      :key="tag"
      class="mx-1"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
  >
    {{ tag }}
  </byte-tag>
  <input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      style="margin: 0 10px; width: 110px"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
  />

  <button v-else @click="showInput" style="padding: 0 10px; width: 110px; height: 24px; font-size: 14px;">
    + New Tag
  </button>
</template>

<script lang="ts" setup>
import ByteTag from "@/components/byte-tag/byte-tag.vue";
import {nextTick, reactive, ref} from 'vue';

const inputValue = ref('');
const dynamicTags = reactive(['Tag 1', 'Tag 2', 'Tag 3']);
const inputVisible = ref(false);
const InputRef = ref();

const handleClose = (tag: string) => {
  dynamicTags.splice(dynamicTags.indexOf(tag), 1);
}

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value.focus();
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = '';
}

</script>

<style scoped>

</style>