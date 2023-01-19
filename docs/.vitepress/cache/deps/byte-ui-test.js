import {
  createBaseVNode,
  createElementBlock,
  openBlock,
  renderSlot
} from "./chunk-6S52NMOK.js";

// node_modules/byte-ui-test/dist/lib.es.js
var u = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [o, c] of e)
    n[o] = c;
  return n;
};
var a = {};
var d = { class: "el-button" };
function f(t, e) {
  return openBlock(), createElementBlock("button", d, [
    createBaseVNode("span", null, [
      renderSlot(t.$slots, "default", {}, void 0, true)
    ])
  ]);
}
var p = u(a, [["render", f], ["__scopeId", "data-v-2d5b4c1f"]]);
var i = {
  install: (t) => {
    t.component("byte-button", p);
  }
};
export {
  i as default
};
//# sourceMappingURL=byte-ui-test.js.map
