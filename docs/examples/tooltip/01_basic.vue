<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Top Left prompts info"
          placement="top-start"
      >
        <button>top-start</button>
      </byte-tooltip>
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Top Center prompts info"
          placement="top"
      >
        <button>top</button>
      </byte-tooltip>
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Top Right prompts info"
          placement="top-end"
      >
        <button>top-end</button>
      </byte-tooltip>
    </div>
    <div class="row">
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Left Top prompts info"
          placement="left-start"
      >
        <button>left-start</button>
      </byte-tooltip>
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Right Top prompts info"
          placement="right-start"
      >
        <button>right-start</button>
      </byte-tooltip>
    </div>
    <div class="row">
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Left Center prompts info"
          placement="left"
      >
        <button class="mt-3 mb-3">left</button>
      </byte-tooltip>
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Right Center prompts info"
          placement="right"
      >
        <button>right</button>
      </byte-tooltip>
    </div>
    <div class="row">
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Left Bottom prompts info"
          placement="left-end"
      >
        <button>left-end</button>
      </byte-tooltip>
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Right Bottom prompts info"
          placement="right-end"
      >
        <button>right-end</button>
      </byte-tooltip>
    </div>
    <div class="row center">
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Bottom Left prompts info"
          placement="bottom-start"
      >
        <button>bottom-start</button>
      </byte-tooltip>
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Bottom Center prompts info"
          placement="bottom"
      >
        <button>bottom</button>
      </byte-tooltip>
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Bottom Right prompts info"
          placement="bottom-end"
      >
        <button>bottom-end</button>
      </byte-tooltip>
    </div>
  </div>
</template>

<style scoped>
button {
  background-color: #67C23A;
  margin: 5px;
}
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
