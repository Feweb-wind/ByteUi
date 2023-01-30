<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Top Left prompts info"
          placement="top-start"
      >
        <byte-button>top-start</byte-button>
      </byte-tooltip>
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Top Center prompts info"
          placement="top"
      >
        <byte-button>top</byte-button>
      </byte-tooltip>
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Top Right prompts info"
          placement="top-end"
      >
        <byte-button>top-end</byte-button>
      </byte-tooltip>
    </div>
    <div class="row">
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Left Top prompts info"
          placement="left-start"
      >
        <byte-button>left-start</byte-button>
      </byte-tooltip>
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Right Top prompts info"
          placement="right-start"
      >
        <byte-button>right-start</byte-button>
      </byte-tooltip>
    </div>
    <div class="row">
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Left Center prompts info"
          placement="left"
      >
        <byte-button>left</byte-button>
      </byte-tooltip>
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Right Center prompts info"
          placement="right"
      >
        <byte-button>right</byte-button>
      </byte-tooltip>
    </div>
    <div class="row">
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Left Bottom prompts info"
          placement="left-end"
      >
        <byte-button>left-end</byte-button>
      </byte-tooltip>
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Right Bottom prompts info"
          placement="right-end"
      >
        <byte-button>right-end</byte-button>
      </byte-tooltip>
    </div>
    <div class="row center">
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Bottom Left prompts info"
          placement="bottom-start"
      >
        <byte-button>bottom-start</byte-button>
      </byte-tooltip>
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Bottom Center prompts info"
          placement="bottom"
      >
        <byte-button>bottom</byte-button>
      </byte-tooltip>
      <byte-tooltip
          class="box-item"
          effect="dark"
          content="Bottom Right prompts info"
          placement="bottom-end"
      >
        <byte-button>bottom-end</byte-button>
      </byte-tooltip>
    </div>
  </div>
</template>

<style scoped>
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
