<template>
  <div>
    <byte-button disabled>Default</byte-button>
    <byte-button type="primary" disabled>Primary</byte-button>
    <byte-button type="success" disabled>Success</byte-button>
    <byte-button type="info" disabled>Info</byte-button>
    <byte-button type="warning" disabled>Warning</byte-button>
    <byte-button type="danger" disabled>Danger</byte-button>
  </div>

  <div>
    <byte-button plain disabled>Plain</byte-button>
    <byte-button type="primary" plain disabled>Primary</byte-button>
    <byte-button type="success" plain disabled>Success</byte-button>
    <byte-button type="info" plain disabled>Info</byte-button>
    <byte-button type="warning" plain disabled>Warning</byte-button>
    <byte-button type="danger" plain disabled>Danger</byte-button>
  </div>
</template>

<style scoped>
div {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
}
</style>