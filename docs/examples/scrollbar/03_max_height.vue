<template>
  <byte-button @click="add">Add Item</byte-button>
  <byte-button @click="onDelete">Delete Item</byte-button>
  <byte-scrollbar max-height="400px">
    <p v-for="item in count" :key="item" class="scrollbar-demo-item">
      {{ item }}
    </p>
  </byte-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const count = ref(3)

const add = () => {
  console.log(count.value);
  count.value++
}
const onDelete = () => {
  if (count.value > 0) {
    count.value--
  }
}
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: #ecf5ff;
  color: #409eff;
}
</style>
