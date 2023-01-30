<template>
  <byte-button-group>
    <byte-button type="primary" :icon="ArrowLeft">Previous Page</byte-button>
    <byte-button type="primary">
      Next Page<byte-icon class="byte-icon--right"><ArrowRight /></byte-icon>
    </byte-button>
  </byte-button-group>

  <byte-button-group class="mar">
    <byte-button type="primary" :icon="Edit" />
    <byte-button type="primary" :icon="Share" />
    <byte-button type="primary" :icon="Delete" />
  </byte-button-group>
</template>

<script setup lang="ts">
import {
  ArrowLeft,
  ArrowRight,
  Delete,
  Edit,
  Share,
} from '@element-plus/icons-vue'
</script>

<style>
.mar {
  margin-left: 30px;
}
</style>