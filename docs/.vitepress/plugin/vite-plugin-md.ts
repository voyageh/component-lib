import { extname, resolve, basename } from "path";
import { readFileSync } from "fs";
import highlight from "../utils/highlight";

interface IOptions {
  demoSrc: string;
}

export default function mdPlugin(options: IOptions) {
  return {
    name: "vite-plugin-md",

    load(id: string) {
      if (extname(id) === ".md") {
        const fileName = basename(id, ".md");
        if (fileName === "index") return;
        const js = `<script setup>
        const demos = import.meta.glob("@demos/${fileName}/*.vue", {
          eager: true,
        });
        console.log('demos222',demos)
        </script>\n`;
        let code = readFileSync(id, "utf-8");
        code = js + code;
        const regex = /:::demo\s+(\S+)\s+:::/g;
        code = code.replace(regex, (_match, middleValue) => {
          const componentPath = resolve(options.demoSrc, middleValue);
          const source = readFileSync(`${componentPath}.vue`, "utf-8");
          return `<Demo  source="${encodeURIComponent(highlight(source, "vue"))}" raw-source="${encodeURIComponent(
            source
          )}" path="${middleValue}" :demos="demos"/>`;
        });

        return code;
      }
    },
    async transform(code, id) {
      if (extname(id) === ".md") {
      }
    },
  };
}
