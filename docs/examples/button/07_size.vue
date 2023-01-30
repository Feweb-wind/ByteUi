<template>
  <div>
    <byte-button size="large">Large</byte-button>
    <byte-button>Default</byte-button>
    <byte-button size="small">Small</byte-button>
    <byte-button size="large" :icon="Search">Search</byte-button>
    <byte-button :icon="Search">Search</byte-button>
    <byte-button size="small" :icon="Search">Search</byte-button>
  </div>
  <div class="my-4">
    <byte-button size="large" round>Large</byte-button>
    <byte-button round>Default</byte-button>
    <byte-button size="small" round>Small</byte-button>
    <byte-button size="large" :icon="Search" round>Search</byte-button>
    <byte-button :icon="Search" round>Search</byte-button>
    <byte-button size="small" :icon="Search" round>Search</byte-button>
  </div>
  <div>
    <byte-button :icon="Search" size="large" circle />
    <byte-button :icon="Search" circle />
    <byte-button :icon="Search" size="small" circle />
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
</script>

<style scoped>
div {
  display: flex;
  align-items: start;
  margin: 10px 0;
}
</style>