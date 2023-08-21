import { resolve } from "path";

export const projRoot = resolve(__dirname, "..", "..", "..");
export const pkgRoot = resolve(projRoot, "packages");
export const compRoot = resolve(pkgRoot, "components");
export const themeRoot = resolve(pkgRoot, "theme-chalk");
export const modulesRoot = resolve(pkgRoot, "udesign-vue");
export const buildRoot = resolve(projRoot, "build");

// 打包
export const outputRoot = resolve(projRoot, "dist");
export const pkgOutput = resolve(outputRoot, "udesign-vue");

export const modulesPackage = resolve(modulesRoot, "package-build.json");
