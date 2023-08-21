import { modulesPackage } from "./paths";
import type { ProjectManifest } from "@pnpm/types";

export const getPackageManifest = (pkgPath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkgPath) as ProjectManifest;
};

export const getPackageDependencies = (pkgPath: string): Record<"dependencies" | "peerDependencies", string[]> => {
  const manifest = getPackageManifest(pkgPath);
  const { dependencies = {}, peerDependencies = {} } = manifest;

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  };
};

export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies(modulesPackage);
  const packages: string[] = [...peerDependencies];
  if (!options.full) {
    packages.push("@vue", ...dependencies);
  }
  console.log(packages);

  return (id: string) => {
    return [...new Set(packages)].some((pkg) => id === pkg || id.startsWith(`${pkg}/`));
  };
};
