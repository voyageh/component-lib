export * from "@udesign-vue/components";

import { makeInstaller } from "./make-installer";
import components from "./component";
export default makeInstaller(components);
