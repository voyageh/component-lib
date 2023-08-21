# 快速开始

本节将介绍如何在项目中使用 `ul-business`。

# 用法

## 引入

仅支持全部引入

```ts
// main.ts
import { createApp } from "vue";
import curd from "ul-business";
import "ul-business/es/style.css";
import App from "./App.vue";

const app = createApp(App);

app.use(curd);
app.mount("#app");
```
