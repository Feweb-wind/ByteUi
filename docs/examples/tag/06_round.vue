<template>
  <div class="flex flex-wrap gap-2 my-2">
    <byte-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        class="mx-1"
        effect="dark"
        round
    >
      {{ item.label }}
    </byte-tag>
  </div>
  <div class="flex flex-wrap gap-2">
    <byte-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        class="mx-1"
        effect="light"
        round
    >
      {{ item.label }}
    </byte-tag>
  </div>
  <div class="flex flex-wrap gap-2 my-2">
    <byte-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        class="mx-1"
        effect="plain"
        round
    >
      {{ item.label }}
    </byte-tag>
  </div>
</template>

<script lang="ts" setup>
const items = [
  { type: '', label: 'Tag 1' },
  { type: 'success', label: 'Tag 2' },
  { type: 'info', label: 'Tag 3' },
  { type: 'danger', label: 'Tag 4' },
  { type: 'warning', label: 'Tag 5' },
]
</script>