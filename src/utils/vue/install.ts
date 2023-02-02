import { App } from "vue";
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
