import type { ComponentResolver } from "unplugin-vue-components";

const getSideEffectsLegacy = (name: string) => {
  const partialName = name.slice(2).toLocaleLowerCase();
  return ["udesign-vue/theme-chalk/base.css", `udesign-vue/theme-chalk/ul-${partialName}.css`];
};

export default function UDesignResolver(): ComponentResolver[] {
  return [
    {
      type: "component",
      resolve: (name: string) => {
        if (name.startsWith("Ul")) {
          return {
            name,
            from: "udesign-vue",
            sideEffects: getSideEffectsLegacy(name),
          };
        }
      },
    },
  ];
}
