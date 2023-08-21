# 安装

## 使用包管理器

::: code-group

```sh [npm]
$ npm install ul-business
```

```sh [pnpm]
$ pnpm install ul-business
```

```sh [yarn]
$ yarn add ul-business
```

:::

## 使用模版

::: code-group

```sh [npm]
$ npx degit zephyr-66/vue3-back <project-name>
```

#### 文件目录

:::

```
.
├── README.md
├── env #环境变量
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public
├── src
│   ├── App.vue
│   ├── api  #接口
│   ├── assets
│   │   ├── config.ts
│   │   └── global.scss   #全局样式
│   ├── auto-components.d.ts
│   ├── auto-imports.d.ts
│   ├── components  #组件
│   │   ├── base-layout.vue
│   │   └── select
│   ├── composables
│   │   └── useRequest.ts #请求函数
│   ├── main.ts
│   ├── pages  #页面
│   │   ├── [...all].vue
│   │   ├── index
│   │   └── index.vue
│   ├── plugins
│   │   ├── curd.ts  #curd插件
│   │   ├── http.ts  #axios插件
│   │   ├── nprogress.ts
│   │   └── rem.ts
│   ├── router  #路由
│   │   ├── index.ts
│   │   └── premission.ts
│   ├── store  #pinia
│   │   └── account.ts
│   ├── style.css
│   ├── types  #类型定义
│   │   └── account.ts
│   ├── utils
│   │   └── index.ts  #工具函数
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
