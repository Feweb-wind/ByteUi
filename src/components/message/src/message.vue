<template>
  <transition @before-leave="onClose" @after-leave="$emit('destroy')">
    <div
      v-show="visible"
      :id="id"
      ref="messageRef"
      :class="[customClass, `icon-${type}`, { center }]"
      class="basic"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      :style="customStyle"
    >
      <!-- <el-badge
        v-if="repeatNum > 1"
        :value="repeatNum"
        :type="badgeType"
        :class="ns.e('badge')"
      /> -->
      <byte-icon v-if="iconComponent" class="icon">
        <component :is="iconComponent" />
      </byte-icon>
      <slot>
        <p
          v-if="!dangerouslyUseHTMLString"
          class="content"
          :class="{ closable: showClose }"
        >
          {{ message }}
        </p>
        <!-- Caution here, message could've been compromised, never use user's input as message -->
        <p
          v-else
          class="content"
          :class="{ closable: showClose }"
          v-html="message"
        />
      </slot>
      <byte-icon v-if="showClose" @click.stop="close">
        <Close />
      </byte-icon>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import {
  useEventListener,
  useResizeObserver,
  useTimeoutFn,
} from "@vueuse/core";
import { TypeComponents, TypeComponentsMap } from "@/utils/vue/icon";
// import ElBadge from "@element-plus/components/badge";
import ByteIcon from "@/components/icon";
import { messageEmits, messageProps } from "./message";
import { getLastOffset, getOffsetOrSpace } from "./instance";
// import type { BadgeProps } from "@element-plus/components/badge";
import type { CSSProperties } from "vue";

const { Close } = TypeComponents;

defineOptions({
  name: "ByteMessage",
});

const props = defineProps(messageProps);
defineEmits(messageEmits);

const messageRef = ref<HTMLDivElement>();
const visible = ref(false);
const height = ref(0);

let stopTimer: (() => void) | undefined = undefined;

// const badgeType = computed<BadgeProps["type"]>(() =>
//   props.type ? (props.type === "error" ? "danger" : props.type) : "info"
// );

const iconComponent = computed(
  () => props.icon || TypeComponentsMap[props.type] || ""
);

const lastOffset = computed(() => getLastOffset(props.id));
const offset = computed(
  () => getOffsetOrSpace(props.id, props.offset) + lastOffset.value
);

const bottom = computed((): number => height.value + offset.value);
const customStyle = computed<CSSProperties>(() => ({
  top: `${offset.value}px`,
}));

function startTimer() {
  if (props.duration === 0) return;
  ({ stop: stopTimer } = useTimeoutFn(() => {
    close();
  }, props.duration));
}

function clearTimer() {
  stopTimer?.();
}

function close() {
  visible.value = false;
}

function keydown({ code }: KeyboardEvent) {
  if (code === "Escape") {
    // press esc to close the message
    close();
  }
}

onMounted(() => {
  startTimer();
  visible.value = true;
});

watch(
  () => props.repeatNum,
  () => {
    clearTimer();
    startTimer();
  }
);

useEventListener(document, "keydown", keydown);

useResizeObserver(messageRef, () => {
  height.value = messageRef.value!.getBoundingClientRect().height;
});

defineExpose({
  visible,
  bottom,
  close,
});
</script>

<style lang="less">
.icon-info {
  color: #909399;
}
.icon-success {
  color: #67c23a;
}
.icon-warning {
  color: #e6a23c;
}
.icon-error {
  color: #f56c6c;
}
.center {
  justify-content: center;
}
.basic {
  width: fit-content;
  position: fixed;
  left: 50%;
  top: 20px;
  box-sizing: border-box;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid;
  .icon {
    margin-right: 10px;
  }
  .content {
    padding: 0;
    font-size: 14px;
    line-height: 1;
    &:focus {
      outline-width: 0;
    }
  }
  .closable {
    padding-right: 21px;
  }
}
</style>
