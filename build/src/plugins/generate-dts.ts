import type { Plugin } from "rollup";
import { Project } from "ts-morph";
import type { CompilerOptions, SourceFile } from "ts-morph";
import { createFilter } from "rollup-pluginutils";
import chalk from "chalk";
import path from "path";
import { readFile } from "fs/promises";
import { parse, compileScript } from "vue/compiler-sfc";
import { projRoot, pkgRoot } from "../utils/paths";
import { pathRewriter } from "../config/build-info";

export default function generateDts(): Plugin {
  const filter = createFilter("/**/*.{js?(x),ts?(x),vue}");
  const TSCONFIG_PATH = path.resolve(projRoot, "tsconfig.web.json");
  const compilerOptions: CompilerOptions = {
    emitDeclarationOnly: true,
    baseUrl: projRoot,
    preserveSymlinks: true,
    skipLibCheck: true,
    noImplicitAny: false,
  };
  const project = new Project({
    compilerOptions,
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true,
  });
  const sourceFiles: SourceFile[] = [];

  return {
    name: "generate-dts",
    async load(id) {
      if (!filter(id)) return;
      if (id.endsWith(".vue")) {
        const content = await readFile(id, "utf-8");
        const hasTsNoCheck = content.includes("@ts-nocheck");

        const sfc = parse(content);
        const { script, scriptSetup } = sfc.descriptor;
        if (script || scriptSetup) {
          let content = (hasTsNoCheck ? "// @ts-nocheck\n" : "") + (script?.content ?? "");

          if (scriptSetup) {
            const compiled = compileScript(sfc.descriptor, {
              id: "xxx",
            });
            content += compiled.content;
          }

          const lang = scriptSetup?.lang || script?.lang || "js";
          const sourceFile = project.createSourceFile(`${path.relative(process.cwd(), id)}.${lang}`, content);
          sourceFiles.push(sourceFile);
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(id);
        sourceFiles.push(sourceFile);
      }
    },
    async buildEnd() {
      const tasks = sourceFiles.map(async (sourceFile) => {
        const relativePath = path.relative(pkgRoot, sourceFile.getFilePath());
        const emitOutput = sourceFile.getEmitOutput();
        const emitFiles = emitOutput.getOutputFiles();
        if (emitFiles.length === 0) {
          throw new Error(`Emit no file: ${chalk.bold(relativePath)}`);
        }

        const tasks = emitFiles.map(async (outputFile) => {
          const fileName = relativePath.replace("udesign-vue/", "").replace(/\.[^.]+$/, ".d.ts");
          this.emitFile({
            type: "asset",
            fileName,
            source: pathRewriter(outputFile.getText(), "esm"),
          });
        });
        await Promise.all(tasks);
      });
      await Promise.all(tasks);
    },
  };
}
