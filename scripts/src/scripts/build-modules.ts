import { cd, cp, exec, ls, mkdir } from "shelljs";
import { fileExists, rmdir } from "src/helpers";
import { config } from "../config";

/**
 * Build all modules in modules folder
 * @param modulesFolders The modules folder name
 */
export function buildModules(modulesFolders: string[]): void {
  if (!fileExists("packages", ".")) mkdir(config.packagesPath);

  modulesFolders.forEach(build);
}

/**
 * Build a module and copy the dist, types and package.json to the packages folder
 * @param workDir A instance of work directory
 * @param moduleName The module folder name
 */
export function build(moduleName: string): void {
  // Build the module with the build script
  cd(`${config.modulesPath}/${moduleName}`);
  exec("yarn && yarn build");
  cd(config.rootDir);

  // Remove the old package in packages folder and create another
  const modulePath = `${config.modulesPath}/${moduleName}`;
  const packagesPath = `${config.packagesPath}/${moduleName}`;
  console.log({ modulePath, packagesPath });

  if (fileExists(moduleName, config.packagesPath)) rmdir(packagesPath);
  mkdir(packagesPath);

  // Copy a folder to the package folder
  const copyFolderFiles = (path: string) => {
    const source = `${modulePath}/${path}`;
    const dest = `${packagesPath}/${path}`;
    if (fileExists(path, packagesPath)) rmdir(dest);
    cp("-r", source, dest);
  };

  // Copy dist, types and the package.json
  copyFolderFiles("dist");
  copyFolderFiles("types");
  cp("-r", `${modulePath}/package.json`, packagesPath);
}
