<template>
  <!--  主要展示select的基本用法 && input框的size -->
  <byte-select
      placeholder="Select"
      :options="options"
      placement="bottom"
  >

  </byte-select>

  <br>
  <br>

  <byte-tag closable size="small">defaultg</byte-tag> &emsp;
  <byte-tag closable size="default">default</byte-tag> &emsp;
  <byte-tag closable size="large">default</byte-tag><br>
  <byte-tag type="success">success</byte-tag><br>
  <byte-tag type="info">info</byte-tag><br>
  <byte-tag type="warning">warning</byte-tag><br>
  <byte-tag type="danger">danger</byte-tag><br>
</template>

<script lang="ts" setup>
import ByteSelect from "@/components/byte-select/byte-select.vue";
import ByteTag from "@/components/byte-tag/byte-tag.vue"
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