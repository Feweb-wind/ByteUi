<template>
<!--  主要展示select的基本用法 && input框的size -->
<byte-select placeholder="Select"></byte-select>
</template>

<script lang="ts" setup>
import ByteSelect from "@/components/byte-select/byte-select.vue";
import { ref } from 'vue';

const value = ref('');

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>

<style scoped>

</style>