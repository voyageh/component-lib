declare module "vue" {
  export interface GlobalComponents {
    UlButton: typeof import("udesign-vue")["UlButton"];
  }
}

export {};
