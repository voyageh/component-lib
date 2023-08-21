import { defineConfig } from "vitepress";
import VueMacros from "unplugin-vue-macros/vite";
import VueJsx from "@vitejs/plugin-vue-jsx";
import mPlugin from "./plugin/vite-plugin-md";
import { resolve } from "path";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "udesign-vue",
  description:
    "udesign-vue is a Vue 3 UI library that contains a set of high quality components and demos for building rich, interactive user interfaces.",
  vite: {
    resolve: {
      alias: {
        "@demos": resolve(__dirname, "../demos"),
      },
    },
    plugins: [
      VueMacros({
        plugins: {
          vueJsx: VueJsx(),
        },
      }),
      mPlugin({
        demoSrc: "docs/demos",
      }),
    ],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "指南", link: "/guide/", activeMatch: "/guide/" },
      { text: "组件", link: "/component/button", activeMatch: "/component/" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            {
              text: "安装",
              link: "/guide/",
            },
            {
              text: "快速开始",
              link: "/guide/quickstart",
            },
          ],
        },
      ],
      "/component/": [
        {
          text: "指南",
          items: [
            {
              text: "Button 按钮",
              link: "/component/button",
            },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],

    outline: {
      label: "本页目录",
    },
  },
});
