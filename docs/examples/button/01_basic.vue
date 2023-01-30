<template>
  <div>
    <byte-button>Default</byte-button>
    <byte-button type="primary">Primary</byte-button>
    <byte-button type="success">Success</byte-button>
    <byte-button type="info">Info</byte-button>
    <byte-button type="warning">Warning</byte-button>
    <byte-button type="danger">Danger</byte-button>
  </div>
  <div>
    <byte-button plain>Plain</byte-button>
    <byte-button type="primary" plain>Primary</byte-button>
    <byte-button type="success" plain>Success</byte-button>
    <byte-button type="info" plain>Info</byte-button>
    <byte-button type="warning" plain>Warning</byte-button>
    <byte-button type="danger" plain>Danger</byte-button>
  </div>

  <div>
    <byte-button round>Round</byte-button>
    <byte-button type="primary" round>Primary</byte-button>
    <byte-button type="success" round>Success</byte-button>
    <byte-button type="info" round>Info</byte-button>
    <byte-button type="warning" round>Warning</byte-button>
    <byte-button type="danger" round>Danger</byte-button>
  </div>

  <div>
    <byte-button :icon="Search" circle />
    <byte-button type="primary" :icon="Edit" circle />
    <byte-button type="success" :icon="Check" circle />
    <byte-button type="info" :icon="Message" circle />
    <byte-button type="warning" :icon="Star" circle />
    <byte-button type="danger" :icon="Delete" circle />
  </div>
</template>

<script lang="ts" setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue';
</script>

<style scoped>
div {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
}
</style>