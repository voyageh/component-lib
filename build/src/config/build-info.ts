import { resolve } from "path";
import { pkgOutput, modulesRoot } from "../utils/paths";

export const target = "es2018";
export const PKG_PREFIX = "@udesign-vue";
export const PKG_NAME = "udesign-vue";
export const ignore = ["**/node_modules/**", "**/dist/**", "gulpfile.ts"];
export const filePrefix = "ul-";

import type { OutputOptions } from "rollup";

// rollup 输出配置
export const buildConfig: OutputOptions[] = [
  {
    format: "esm",
    dir: resolve(pkgOutput, "es"),
    preserveModules: true, // 保留模块目录结构
    preserveModulesRoot: modulesRoot, // 相对于设置的目录去生成打包目录
    sourcemap: true,
    entryFileNames: `[name].mjs`,
  },
  {
    format: "cjs",
    dir: resolve(pkgOutput, "lib"),
    exports: "named",
    preserveModules: true,
    preserveModulesRoot: modulesRoot,
    sourcemap: true,
    entryFileNames: `[name].js`,
  },
];

// 路径重写
export const pathRewriter = (code: string, format: string) => {
  const path = format === "esm" ? `${PKG_NAME}/es` : `${PKG_NAME}/lib`;
  return code.replace(new RegExp(PKG_PREFIX, "ig"), `${path}`);
};
