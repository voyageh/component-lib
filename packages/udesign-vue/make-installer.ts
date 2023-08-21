import type { App, Plugin } from "vue";
import { INSTALLED_KEY } from "@udesign-vue/utils";

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: any) => {
    if (app[INSTALLED_KEY]) return;
    app[INSTALLED_KEY] = true;

    components.forEach((c) => app.use(c));
  };

  return {
    install,
  };
};
