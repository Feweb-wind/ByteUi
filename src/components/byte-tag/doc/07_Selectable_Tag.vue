<template>
  <byte-check-tag checked style="margin-right: 8px">Checked</byte-check-tag>
  <byte-check-tag :checked="checked" @change="onChange">Toggle me</byte-check-tag>
</template>

<script lang="ts" setup>
import ByteCheckTag from "@/components/byte-check-tag/byte-check-tag.vue";
import { ref } from 'vue'

const checked = ref(false)

const onChange = (status: boolean) => {
  checked.value = status
}
</script>

<style scoped>

</style>