import DefaultTheme from "vitepress/theme";
import Demo from "../components/demo.vue";
import "./code.scss";
import "./custom.css";

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.component("Demo", Demo);
  },
};
