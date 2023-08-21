import { defineConfig } from "vite";
import VueMacros from "unplugin-vue-macros/vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      VueMacros({
        plugins: {
          vue: Vue(),
          vueJsx: VueJsx(),
        },
      }),
    ],
  };
});
