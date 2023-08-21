import { parallel, series } from "gulp";
import { resolve } from "path";
import { copy } from "fs-extra";
import { run, runTask, withTaskName } from "./src/utils/process";
import { modulesRoot, pkgOutput, projRoot } from "./src/utils/paths";

const copyFiles = () =>
  Promise.all([
    copy(resolve(modulesRoot, "package-build.json"), resolve(pkgOutput, "package.json")),
    copy(resolve(projRoot, "global.d.ts"), resolve(pkgOutput, "global.d.ts")),
  ]);

export default series(
  withTaskName("clean", () => run("pnpm run clean")),
  parallel(
    runTask("buildComponent"), // 打包组件
    runTask("buildThemeChalk") // 打包主题
  ),
  copyFiles
);

// 导出所有任务
// buildComponent => @esbuild-kit/cjs-loader 会解析到buildComponent并运行
export * from "./src/tasks";
