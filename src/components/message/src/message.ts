// import { isClient } from '@vueuse/core'
import { mutable, Mutable } from "@/utils/typescript";
import {
  type VNode,
  AppContext,
  ExtractPropTypes,
  ComponentInternalInstance,
} from "vue";

export interface MessageConfigContext {
  max?: number;
}

export type MessageContext = {
  id: string;
  vnode: VNode;
  handler: MessageHandler;
  vm: ComponentInternalInstance;
  props: Mutable<MessageProps>;
};
export const messageConfig: MessageConfigContext = {};

export const messageDefaults = mutable({
  customClass: "",
  center: false,
  dangerouslyUseHTMLString: false,
  duration: 3000,
  icon: undefined,
  id: "",
  message: "",
  onClose: undefined,
  showClose: false,
  type: "info",
  offset: 16,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: document.body,
  // appendTo: isClient ? document.body : (undefined as never),
} as const);

export const messageTypes = ["success", "info", "warning", "error"] as const;
export type messageType = typeof messageTypes[number];

export const messageProps = {
  customClass: {
    type: String,
    default: messageDefaults.customClass,
  },
  center: {
    type: Boolean,
    default: messageDefaults.center,
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: messageDefaults.dangerouslyUseHTMLString,
  },
  duration: {
    type: Number,
    default: messageDefaults.duration,
  },
  icon: {
    type: [String, Object, Function],
    default: messageDefaults.icon,
  },
  id: {
    type: String,
    default: messageDefaults.id,
  },
  message: {
    type: [String, Object, Function],
    default: messageDefaults.message,
  },
  onClose: {
    type: Function,
    required: false,
  },
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose,
  },
  type: {
    type: String,
    values: messageTypes,
    default: messageDefaults.type,
  },
  offset: {
    type: Number,
    default: messageDefaults.offset,
  },
  zIndex: {
    type: Number,
    default: messageDefaults.zIndex,
  },
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping,
  },
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum,
  },
};

export type MessageProps = ExtractPropTypes<typeof messageProps>;

export const messageEmits = {
  destroy: () => true,
};
export type MessageEmits = typeof messageEmits;

export type MessageOptions = Partial<
  Mutable<
    Omit<MessageProps, "id"> & {
      appendTo?: HTMLElement | string;
    }
  >
>;
export type MessageOptionsWithType = Omit<MessageOptions, "type">;

export type MessageParams = MessageOptions | MessageOptions["message"];
export type MessageParamsNormalized = Omit<MessageProps, "id"> & {
  appendTo: HTMLElement;
};

export type MessageParamsWithType =
  | MessageOptionsWithType
  | MessageOptions["message"];

export interface MessageHandler {
  close: () => void;
}

export type MessageFn = {
  (options?: MessageParams, appContext?: null | AppContext): MessageHandler;
  closeAll(type?: messageType): void;
};

export type MessageTypedFn = (
  options?: MessageParamsWithType,
  appContext?: null | AppContext
) => MessageHandler;

export interface Message extends MessageFn {
  success: MessageTypedFn;
  warning: MessageTypedFn;
  info: MessageTypedFn;
  error: MessageTypedFn;
}
