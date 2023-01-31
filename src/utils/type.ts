export const isElement = (e: unknown): e is Element => {
  if (typeof Element === "undefined") return false;
  return e instanceof Element;
};

export { isNumber, isString, isFunction } from "lodash-unified";
export { isVNode } from "vue";
