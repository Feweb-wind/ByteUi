import { App } from "vue";
import { NOOP } from "@vue/shared";
import { SFCInstallWithContext, SFCWithInstall } from "./typescript";

export const withInstall = (comp) => {
  comp.install = (app: App) => {
    app.component(comp.name, comp);
  };
  return comp;
};

export const withInstallFunction = <T>(fn: T, name: string) => {
  (fn as SFCWithInstall<T>).install = (app: App) => {
    (fn as SFCInstallWithContext<T>)._context = app._context;
    app.config.globalProperties[name] = fn;
  };

  return fn as SFCInstallWithContext<T>;
};

export const withNoopInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = NOOP;

  return component as SFCWithInstall<T>;
};
