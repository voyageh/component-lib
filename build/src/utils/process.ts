import { execa } from "execa";
import chalk from "chalk";
import consola from "consola";
import type { TaskFunction } from "gulp";
import { projRoot, buildRoot } from "../utils/paths";

export const run = async (command: string, cwd: string = projRoot) =>
  new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = command.split(" ");
    consola.info(`run: ${chalk.green(`${cmd} ${args.join(" ")}`)}`);
    const childProcess = execa(cmd, args, {
      cwd, // 指定子进程的当前工作目录
      stdio: "inherit", // 将子进程的输出共享到主进程
      shell: process.platform === "win32", // 在 Windows 平台使用 shell 来执行命令
    });

    childProcess
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(new Error(chalk.red(e.message)));
      });

    // 父进程退出时，杀死子进程
    // 不需要手动移除 'exit' 事件监听器，它会在进程终止时自动清理
    process.on("exit", () => {
      if (!childProcess.killed) {
        childProcess.kill();
      }
    });
  });

export const withTaskName = <T extends TaskFunction>(name: string, fn: T) => Object.assign(fn, { displayName: name });

export const runTask = (name: string) =>
  withTaskName(`shellTask:${name}`, () => run(`pnpm run start ${name}`, buildRoot));
