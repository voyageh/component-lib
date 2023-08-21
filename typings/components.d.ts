declare module "vue" {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    UlButton: typeof import("../packages/udesign-vue")["UlButton"];
  }
}

export {};
